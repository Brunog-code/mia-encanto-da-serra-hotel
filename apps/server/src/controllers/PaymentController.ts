import { PaymentStatus, PaymentMethod, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { paymentSchema } from "../shared/src/lib/zod/paymentSchema.js";
import { generatePreference } from "../services/paymentService.js";
import { db } from "../lib/prisma.js";

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

      // 🔹 Atualiza reserva para CONFIRMED
      await db.reservation.update({
        where: { id: idReservation },
        data: { status: "CONFIRMED" },
      });

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
