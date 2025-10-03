import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class RoomController {
    private prisma: PrismaClient;
        constructor() {
        this.prisma = new PrismaClient();
    }

    public getAllRooms = async(req: Request, res: Response) => {
        try{
            const rooms = await this.prisma.roomType.findMany({
                include:{
                    mediaImages: true
                }
            })

            if(rooms.length == 0) return res.json({message: "Não existem tipos de quarto cadastrados"})

            res.status(200).json(rooms)
        }catch(error){
            console.error("Erro ao buscar as imagens", error);
            res.status(500).json({ error: "Erro ao buscar as informações" });
        }
    }

    public getRoomById = async(req: Request, res: Response) => {
        const {id} = req.params
        
        if(!id) return res.json({message: 'Nenhum id enviado.'})

        const room = await this.prisma.roomType.findUnique({
            where:{
                id
            },
            include: {
                mediaImages: true
            }
        })

        if(!room) return res.json({message: 'Nenhum quarto encontrado'})

        return res.status(200).json(room)
    }
}