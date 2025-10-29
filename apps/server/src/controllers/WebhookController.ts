import { PrismaClient, PaymentStatus, PaymentMethod } from "@prisma/client";
import { Request, Response } from "express";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { db } from "../lib/prisma.js";
import { sendEmail } from "../services/emailService.js";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

export class WebhookController {
  private prisma: PrismaClient;
  private mpClient?: Payment;

  constructor() {
    this.prisma = db;
  }

  public handlePaymentNotification = async (req: Request, res: Response) => {
    console.log("🛰️ [Webhook] Notificação recebida do Mercado Pago");
    console.log("📦 Body recebido:", JSON.stringify(req.body, null, 2));

    if (!process.env.ACCESS_TOKEN) {
      console.error("ACCESS_TOKEN não definido!");
      return res.sendStatus(500);
    }

    // Cria o cliente Mercado Pago autenticado
    const client = new MercadoPagoConfig({
      accessToken: process.env.ACCESS_TOKEN!,
    });

    // Instancia a classe Payment com o cliente configurado
    this.mpClient = new Payment(client);

    try {
      const { type, data } = req.body;

      if (type === "payment") {
        const paymentId = data.id;

        if (!paymentId) {
          console.warn("Webhook sem paymentId");
          return res.sendStatus(400);
        }

        //1-Buscando e tratando os detalhes do Pagamento
        const paymentDetails = await (this.mpClient as any).get({
          id: paymentId,
        });
        const paymentData = (paymentDetails as any).result || paymentDetails;

        const paymentStatusMP = paymentData.status; //ex: approved, pending, rejected, refunded
        const paymentStatusDetail = paymentData.status_detail; // motivo do rejeitado
        const externalReference: string | undefined =
          paymentData.external_reference;
        const transactionAmount: number = paymentData.transaction_amount || 0;
        const installments = paymentData.installments || 1;

        const paymentMethod: PaymentMethod =
          paymentData.payment_type_id === "pix"
            ? PaymentMethod.PIX
            : PaymentMethod.CARD;

        if (!externalReference) {
          console.warn("Pagamento sem external_reference (ID Reserva)");
          return res.sendStatus(400);
        }

        //2-Tradução do Status:(FOCADO APENAS NO STATUS DO PAGAMENTO)
        let status: PaymentStatus;
        switch (paymentStatusMP) {
          case "approved":
            status = PaymentStatus.PAID;
            break;
          case "rejected":
            status = PaymentStatus.FAILED;
            break;
          // Lógica para Estorno/Reembolso
          case "refunded":
          case "cancelled":
          case "charged_back":
            status = PaymentStatus.REFUNDED;
            break;
          default:
            status = PaymentStatus.PENDING;
            break;
        }

        console.log(
          `[Webhook] ID: ${paymentId}, Status MP: ${paymentStatusMP}, Detalhe: ${paymentStatusDetail}`
        );

        //3-Atualização no DB (SOMENTE O REGISTRO DE PAGAMENTO)
        await this.prisma.payment.upsert({
          where: { reservationId: externalReference },
          update: {
            status,
            mpPaymentId: paymentId,
            amount: transactionAmount,
            methodPayment: paymentMethod,
            installments,
          },
          create: {
            reservationId: externalReference,
            status,
            mpPaymentId: paymentId,
            methodPayment: paymentMethod,
            amount: transactionAmount,
            installments,
          },
        });

        //Atualiza o status da reserva
        const reservation = await this.prisma.reservation.update({
          where: { id: externalReference },
          data: {
            status:
              status === PaymentStatus.PAID
                ? "CONFIRMED"
                : status === PaymentStatus.REFUNDED
                ? "CANCELED"
                : "PENDING",
          },
          include: { customer: true }, //relação com usuário
        });

        //ENVIO DE EMAIL (apenas se pago)
        if (status === PaymentStatus.PAID && reservation?.customer?.email) {
          try {
            await sendEmail({
              to: reservation.customer.email,
              subject: "Sua reserva foi confirmada! 🎉",
              html: `
                <div style="font-family: 'Segoe UI', Roboto, sans-serif; background-color: #f9f9f9; padding: 40px 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            
            <!-- Cabeçalho -->
            <div style="background-color: #c78d38; color: #fff; text-align: center; padding: 20px 0;">
              <h1 style="margin: 0; font-size: 24px;">Reserva Confirmada 🎉</h1>
              <p style="margin: 4px 0 0;">Mia Encanto da Serra Hotel</p>
            </div>
            
            <!-- Corpo -->
            <div style="padding: 30px;">
              <p style="font-size: 16px; color: #333;">Olá <strong>${
                reservation.customer.name
              }</strong>,</p>
              <p style="font-size: 15px; color: #555;">
                Temos o prazer de informar que sua reserva <strong>#${
                  reservation.reservationNumber
                }</strong> foi <strong>confirmada com sucesso!</strong>
              </p>

              <div style="margin: 20px 0; padding: 15px; background-color: #f3f3f3; border-radius: 8px;">
                <p style="margin: 0; font-size: 15px; color: #333;">
                  💳 <strong>Valor pago:</strong> R$ ${transactionAmount.toFixed(
                    2
                  )}
                </p>
                <p style="margin: 4px 0 0; font-size: 15px; color: #333;">
                  🏨 <strong>Check-in:</strong> ${dayjs(reservation.checkIn)
                    .utc()
                    .format("DD/MM/YYYY")}
                </p>
                <p style="margin: 4px 0 0; font-size: 15px; color: #333;">
                  🏁 <strong>Check-out:</strong> ${dayjs(reservation.checkOut)
                    .utc()
                    .format("DD/MM/YYYY")}
                </p>
              </div>

              <p style="font-size: 15px; color: #555;">
                Caso precise de qualquer assistência, nossa equipe está à disposição para ajudar você a ter uma estadia inesquecível.
              </p>

              <p style="font-size: 13px; color: #999; margin-top: 25px;">
                Este é um e-mail automático. Por favor, não responda.
              </p>
            </div>
            
            <!-- Rodapé -->
            <div style="background-color: #fafafa; text-align: center; padding: 15px; border-top: 1px solid #eee;">
              <p style="font-size: 13px; color: #888;">
                © ${new Date().getFullYear()} Mia Encanto da Serra Hotel<br/>
                <span style="color:#c78d38;">Encantos da Serra — Onde o conforto encontra a natureza.</span>
              </p>
            </div>
          </div>
        </div>
              `,
            });
            console.log(`Email enviado para ${reservation.customer.email}`);
          } catch (emailError) {
            console.error("Erro ao enviar email de confirmação:", emailError);
            // não precisa quebrar o webhook
          }
        }
      }

      //Retornar 200 OK é crucial para que o Mercado Pago não tente reenviar a notificação
      res.sendStatus(200);
    } catch (error: any) {
      console.error("❌ Erro no webhook:", error.message, error.stack);

      // Retornamos 200 OK mesmo com erro interno para evitar que o Mercado Pago faça spam de retentativas.
      res.sendStatus(200);
    }
  };
}
