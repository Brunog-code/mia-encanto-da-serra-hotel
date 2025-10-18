import { PrismaClient, PaymentStatus, PaymentMethod } from "@prisma/client";
import { Request, Response } from "express";
import { MercadoPagoConfig, Payment } from "mercadopago";

export class WebhookController {
  private prisma: PrismaClient;
  private mpClient?: Payment;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public handlePaymentNotification = async (req: Request, res: Response) => {
    if (!process.env.ACCESS_TOKEN) {
      console.error("❌ ACCESS_TOKEN não definido!");
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

        //2-Tradução do Status: (FOCADO APENAS NO STATUS DO PAGAMENTO)
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
          `[Webhook] ID: ${paymentId}. Status MP: ${paymentStatusMP}. Status DB: ${status}`
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
        await this.prisma.reservation.update({
          where: { id: externalReference },
          data: {
            status:
              status === PaymentStatus.PAID
                ? "CONFIRMED"
                : status === PaymentStatus.REFUNDED
                ? "CANCELED"
                : "PENDING",
          },
        });
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
