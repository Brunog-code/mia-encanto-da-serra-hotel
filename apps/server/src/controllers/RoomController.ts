import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { reservationSchema } from "../shared/src/lib/zod/reservationSchema.js";
import dayjs from "dayjs";
import { db } from "../lib/prisma.js";
export class RoomController {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = db;
  }

  public getAllRooms = async (req: Request, res: Response) => {
    try {
      const rooms = await this.prisma.roomType.findMany({
        include: {
          mediaImages: true,
        },
      });

      if (rooms.length == 0)
        return res.json({ message: "Não existem tipos de quarto cadastrados" });

      res.status(200).json(rooms);
    } catch (error) {
      console.error("Erro ao buscar as imagens", error);
      res.status(500).json({ error: "Erro ao buscar as informações" });
    }
  };

  public getRoomById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Nenhum id enviado." });

    const room = await this.prisma.roomType.findUnique({
      where: {
        id,
      },
      include: {
        mediaImages: true,
      },
    });

    if (!room)
      return res.status(404).json({ message: "Nenhum quarto encontrado" });

    return res.status(200).json(room);
  };

  public getAvailability = async (req: Request, res: Response) => {
    try {
      const checkIn = req.query.checkIn as string;
      const checkOut = req.query.checkOut as string;
      const guests = req.query.guests as string;

      //validar com zod
      const parseData = reservationSchema.safeParse({
        checkin: checkIn,
        checkout: checkOut,
        guests: guests,
      });
      if (!parseData.success) {
        const flattened = parseData.error.flatten();
        return res.status(400).json({
          message: "Dados inválidos",
          fieldErrors: flattened.fieldErrors, //erros por campo
          formErrors: flattened.formErrors, //erros globais
        });
      }

      //transforma em date
      const checkInDate = dayjs(checkIn).startOf("day").toDate();
      const checkOutDate = dayjs(checkOut).endOf("day").toDate();
      const guestsNumber = Number(guests);

      //Buscar os tipos de quarto com unidades disponíveis
      const availability = await this.prisma.room.groupBy({
        by: ["typeId"],
        _count: { id: true },
        where: {
          status: { not: "MAINTENANCE" },
          capacity: { gte: guestsNumber },
          reservations: {
            none: {
              AND: [
                { checkIn: { lte: checkOutDate } },
                { checkOut: { gte: checkInDate } },
                { status: { in: ["PENDING", "CONFIRMED"] } },
              ],
            },
          },
        },
      });

      return res.status(200).json(availability);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao buscar disponibilidade" });
    }
  };
}
