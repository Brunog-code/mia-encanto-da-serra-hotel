import { PrismaClient } from "@prisma/client";
import {Request, Response} from 'express'

export class ReservationController {
    private prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }

    public getNumberReservation = async(req: Request, res: Response) => {
        try{
            const lastNumberReservation = await this.prisma.reservation.findFirst({
                orderBy: {
                    reservationNumber: 'desc'
                },
                select: {
                    reservationNumber: true
                }
            })

            return res.status(200).json({number: lastNumberReservation ? lastNumberReservation.reservationNumber : 1001})
        }catch(error){
            console.error(error)
            return res.status(500).json({message: 'Erro interno ao buscar o numero da reserva'})
        }
    }

    public createReservation = async(req: Request, res: Response) => {
        try{
            const reservation = req.body

            //verificar se tem quarto disponivel daqeuel tiupo


        }catch(error){
            console.error(error)
            return res.status(500).json({message: 'Erro interno ao criar a reserva'})
        }
    }
}