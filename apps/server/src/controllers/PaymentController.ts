import { PaymentStatus, PaymentMethod, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { paymentSchema } from "../shared/src/lib/zod/paymentSchema.js";
import { generatePreference } from "../services/paymentService.js";
import { db } from "../lib/prisma.js";
import dayjs from "dayjs";
import { sendEmail } from "../services/emailService.js";

export class PaymentController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = db;
  }

  public createPaymentPreference = async (req: Request, res: Response) => {
    //converte pra number pro zod validar
    const requestData = {
      ...req.body,
      totalAmountReservation: Number(req.body.totalAmountReservation),
    };
    try {
      //1 - validar dados (zod)
      const parsedData = paymentSchema.parse(requestData);
      const { idReservation, userEmail } = parsedData;

      //2-validar no db (reservation e usuario)
      const reservation = await this.prisma.reservation.findUnique({
        where: {
          id: idReservation,
        },
      });
      if (!reservation)
        return res.status(404).json({ error: "Reserva não encontrada" });

      const user = await this.prisma.customer.findUnique({
        where: {
          email: userEmail,
        },
      });
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });

      //chama function(service) que cria a preferencia
      const preferencePayment = await generatePreference(parsedData);

      //salva o link de pagamento no db(payment final será salvo no webhook)
      await this.prisma.payment.upsert({
        where: { reservationId: idReservation },
        update: {
          paymentLink: preferencePayment.init_point,
        },
        create: {
          reservationId: idReservation,
          paymentLink: preferencePayment.init_point,
          status: PaymentStatus.PENDING,
          methodPayment: PaymentMethod.CARD, //placeholder
          amount: 0, //placeholder
          mpPaymentId: "pending", //placeholder
          installments: 1,
        },
      });

      //resposta pro frontend
      res.status(200).json(preferencePayment);
    } catch (error) {
      console.error(
        "Erro no Mercado Pago (PaymentController):",
        JSON.stringify(error, null, 2)
      );
      return res
        .status(500)
        .json({ message: "Erro interno ao criar o pagamento" });
    }
  };

  public simulatePaymentPreference = async (req: Request, res: Response) => {
    const requestData = {
      ...req.body,
      totalAmountReservation: Number(req.body.totalAmountReservation),
    };

    try {
      //1 - validar dados (zod)
      const parsedData = paymentSchema.parse(requestData);
      const { idReservation, totalAmountReservation, userEmail } = parsedData;

      //2-validar no db (reservation e usuario)
      const reservation = await this.prisma.reservation.findUnique({
        where: {
          id: idReservation,
        },
        include: { customer: true }, //usuario da reserva
      });
      if (!reservation)
        return res.status(404).json({ error: "Reserva não encontrada" });

      const user = await this.prisma.customer.findUnique({
        where: {
          email: userEmail,
        },
      });
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });

      //simula registro de pagamento no banco
      await db.payment.upsert({
        where: { reservationId: idReservation },
        update: {
          status: PaymentStatus.PAID,
          methodPayment: PaymentMethod.CARD,
          amount: totalAmountReservation,
          installments: 1,
        },
        create: {
          reservationId: idReservation,
          status: PaymentStatus.PAID,
          methodPayment: PaymentMethod.CARD,
          amount: totalAmountReservation,
          installments: 1,
        },
      });

      //Atualiza reserva para CONFIRMED
      await db.reservation.update({
        where: { id: idReservation },
        data: { status: "CONFIRMED" },
      });

      //envio de email
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
                        💳 <strong>Valor pago:</strong> R$ ${reservation.totalAmount.toFixed(
                          2
                        )}
                      </p>
                      <p style="margin: 4px 0 0; font-size: 15px; color: #333;">
                        🏨 <strong>Check-in:</strong> ${dayjs(
                          reservation.checkIn
                        )
                          .utc()
                          .format("DD/MM/YYYY")}
                      </p>
                      <p style="margin: 4px 0 0; font-size: 15px; color: #333;">
                        🏁 <strong>Check-out:</strong> ${dayjs(
                          reservation.checkOut
                        )
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

      //resposta pro frontend
      res.status(200).json({
        message: "Pagamento simulado com sucesso!",
        redirectUrl: "/success?payment_id=9999&status=approved&order_id=9999",
      });
    } catch (error) {
      console.error(
        "Erro no Mercado Pago (PaymentController):",
        JSON.stringify(error, null, 2)
      );
      return res
        .status(500)
        .json({ message: "Erro interno ao criar o pagamento" });
    }
  };

  public refundPayment = async (req: Request, res: Response) => {
    try {
      const { paymentId, reservationId } = req.body;

      if (!reservationId || !paymentId)
        return res.status(400).json({ message: "paymentId é obrigatório" });

      if (!process.env.ACCESS_TOKEN)
        return res
          .status(500)
          .json({ message: "Token Mercado Pago não definido" });

      //Faz requisição ao endpoint de refund do Mercado Pago
      const mpResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}/refunds`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await mpResponse.json();

      if (!mpResponse.ok) {
        console.error("Erro Mercado Pago:", data);
        return res
          .status(500)
          .json({ message: "Erro ao solicitar estorno", details: data });
      }

      console.log("Refund Mercado Pago:", data);

      //Atualiza o status no DB
      await this.prisma.payment.update({
        where: {
          reservationId,
        },
        data: {
          status: PaymentStatus.REFUNDED,
        },
      });
      return res
        .status(200)
        .json({ message: "Pagamento estornado com sucesso" });
    } catch (error) {
      console.error("Erro ao estornar o pagamento", error);
      res.status(500).send("Erro interno no redirecionamento de falha");
    }
  };

  public success = async (req: Request, res: Response) => {
    try {
      const { payment_id, status, merchant_order_id } = req.query;

      res.redirect(
        `http://localhost:5173/success?payment_id=${payment_id}&status=${status}&order_id=${merchant_order_id}`
      );
    } catch (error) {
      console.error("Erro no redirecionamento success:", error);
      res.status(500).send("Erro interno no redirecionamento de falha");
    }
  };

  public failure = async (req: Request, res: Response) => {
    try {
      const { payment_id, status, merchant_order_id } = req.query;

      //redireciona para a página de erro no frontend
      res.redirect(
        `http://localhost:5173/failure?payment_id=${payment_id}&status=${status}&order_id=${merchant_order_id}`
      );
    } catch (error) {
      console.error("Erro no redirecionamento failure:", error);
      res.status(500).send("Erro interno no redirecionamento de falha");
    }
  };

  public pending = async (req: Request, res: Response) => {
    try {
      const { payment_id, status, merchant_order_id } = req.query;

      //redireciona para a página de pagamento pendente
      res.redirect(
        `http://localhost:5173/pending?payment_id=${payment_id}&status=${status}&order_id=${merchant_order_id}`
      );
    } catch (error) {
      console.error("Erro no redirecionamento pending:", error);
      res.status(500).send("Erro interno no redirecionamento pendente");
    }
  };
}
