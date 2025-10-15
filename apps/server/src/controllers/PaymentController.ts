import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { paymentSchema } from "../shared/src/lib/zod/paymentSchema.js";
import { generatePreference } from "../services/paymentService.js";

export class PaymentController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public createPaymentPreference = async (req: Request, res: Response) => {
    //converte pra number pro zod validar
    const requestData = {
      ...req.body,
      totalAmountReservation: Number(req.body.totalAmountReservation),
    };
    try {
      //1 - validar dados (zod) (verificar depois )
      const parsedData = paymentSchema.parse(requestData);
      const {
        idReservation,
        chekeInReservation,
        chekeOutReservation,
        roomCategory,
        totalAmountReservation,
        userName,
        userEmail,
        userPhone,
      } = parsedData;

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

      //resposta pro frontend
      res.status(200).json(preferencePayment);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro interno ao criar o pagamento" });
    }
  };

  public success = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };

  public failure = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };

  public pending = async (req: Request, res: Response) => {};
}
