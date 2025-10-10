import { PrismaClient } from "@prisma/client";
import {Request, Response} from 'express'
import { reservationFullValidation, type reservationFullValidationSchema } from "../shared/src/lib/zod/reservationFullValidation.js";

export class ReservationController {
    private prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }

    public createReservation = async(req: Request, res: Response) => {
        try{
            const reservationData = req.body

            //1-validar dados
            const parseData = reservationFullValidation.parse(reservationData)

            const {
                checkIn,
                checkOut,
                guestCount,
                totalAmount,
                customerId,
                roomTypeId
            } = parseData

            //$transaction() - Ou todas as queries dão certo, ou nenhuma é gravada no banco. garante atomicidade.
            const reservation = await this.prisma.$transaction(async (tx) => {
                //procurar quarto fisico disponivel de acordo com o typeRoom
                const availableRoom = await tx.room.findFirst({
                    where: {
                        typeId: roomTypeId,
                        reservations: {
                            none:{
                                OR: [
                                    {
                                        checkIn: { lte: new Date(checkOut) },
                                        checkOut: { gte: new Date(checkIn) },
                                    }
                                ]
                            }
                        }
                    }
                })
                //se não houver, lança erro
                if(!availableRoom) throw new Error('Nenhum quarto disponível para este tipo.')

                //criar o numero da reserva
                const lastNumberReservation  = await tx.reservation.findFirst({
                    orderBy: {reservationNumber: 'desc'},
                    select: {reservationNumber: true} 
                })

                const nextReservationNumber = lastNumberReservation ? lastNumberReservation.reservationNumber + 1 : 1001

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
                    }
                })
                
                return reservation;
            })

            return res.status(201).json(reservation);
        }catch(error){
            console.error(error)
            return res.status(500).json({message: 'Erro interno ao criar a reserva'})
        }
    }

    public getAllReservations = async(req: Request, res: Response) => {
        try{

            const {userId} = req.params

            if(userId) return res.status(400).json({message: "Usuário não informado"})


            const reservations = await this.prisma.reservation.findMany()
        }catch(error){
            console.error(error)
            return res.status(500).json({message: 'Erro interno ao carregar as reservas'})
        }
    }
}