import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { reservationFullValidation } from "../shared/src/lib/zod/reservationFullValidation.js";
import dayjs from "dayjs";
import { db } from "../lib/prisma.js";

export class ReservationController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = db;
  }

  public createReservation = async (req: Request, res: Response) => {
    try {
      const reservationData = req.body;

      //1-validar dados
      const parseData = reservationFullValidation.parse(reservationData);

      const {
        checkIn,
        checkOut,
        guestCount,
        totalAmount,
        customerId,
        roomTypeId,
      } = parseData;

      //$transaction() - Ou todas as queries dão certo, ou nenhuma é gravada no banco. garante atomicidade.
      const reservation = await this.prisma.$transaction(async (tx) => {
        //procurar quarto fisico disponivel de acordo com o typeRoom
        const availableRoom = await tx.room.findFirst({
          where: {
            typeId: roomTypeId,
            reservations: {
              none: {
                OR: [
                  {
                    checkIn: { lte: new Date(checkOut) },
                    checkOut: { gte: new Date(checkIn) },
                  },
                ],
              },
            },
          },
        });
        //se não houver disponivel, lança erro
        if (!availableRoom)
          throw new Error("Nenhum quarto disponível para este tipo.");

        //criar o numero da reserva
        const lastNumberReservation = await tx.reservation.findFirst({
          orderBy: { reservationNumber: "desc" },
          select: { reservationNumber: true },
        });

        const nextReservationNumber = lastNumberReservation
          ? lastNumberReservation.reservationNumber + 1
          : 1001;

        //criar reserva no db
        const reservation = await tx.reservation.create({
          data: {
            reservationNumber: nextReservationNumber,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            guestCount: Number(guestCount),
            totalAmount,
            customerId,
            roomId: availableRoom.id,
          },
        });

        return reservation;
      });

      return res.status(201).json(reservation);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro interno ao criar a reserva" });
    }
  };

  public getAllReservations = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(400).json({ message: "Usuário não informado" });

      const reservations = await this.prisma.reservation.findMany({
        where: {
          customerId: id,
        },
        include: {
          room: {
            include: {
              type: {
                select: {
                  category: true,
                  mediaImages: true,
                },
              },
            },
          },
          payment: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(reservations);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro interno ao carregar as reservas" });
    }
  };

  public cancelReservation = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      //se não passar id, retorna erro
      if (!id)
        return res.status(400).json({ message: "ID da reserva é obrigatório" });

      //verifica se tem reserva com o id passado
      const reservation = await this.prisma.reservation.findUnique({
        where: {
          id,
        },
        include: { payment: true },
      });

      //se não existir reserva
      if (!reservation)
        return res
          .status(400)
          .json({ message: "Não existe reserva com esse ID" });

      //se a reserva ja estiver cancelada
      if (reservation.status === "CANCELED")
        return res.status(400).json({ message: "Reserva já está cancelada" });

      //verifica se pode cancelar (5 dias antes do check-in)
      const daysBeforeCheckIn = dayjs(reservation.checkIn).diff(dayjs(), "day");
      const canRefund = daysBeforeCheckIn >= 5;

      //alterar status da reserva e liberar quarto fisico
      const updatedReservation = await this.prisma.reservation.update({
        where: {
          id,
        },
        data: {
          status: "CANCELED",
        },
      });

      //se houver pagamento aprovado, retorna o paymentId para o PaymentController
      if (reservation.payment?.status == "PAID") {
        return res.status(200).json({
          message: "Reserva cancelada com sucesso.",
          reservationId: reservation.id,
          paymentId: reservation.payment.mpPaymentId,
          canRefund,
          daysBeforeCheckIn,
        });
      }

      return res
        .status(200)
        .json({ message: "Reserva cancelada com sucesso", updatedReservation });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro interno ao cancelar a reserva" });
    }
  };
}
