import { PrismaClient, MediaCategory } from "@prisma/client";
import { Request, Response } from "express";

export class ImageController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    // Arrow function mantém o "this" correto
    public getAllImages = async (req: Request, res: Response) => {
        try{
            const imgs = await this.prisma.mediaImage.findMany()

            if(imgs.length === 0)return {message: "Não existem imagens"}

            res.status(200).json(imgs)

        }catch(error){
            console.error("Erro ao buscar as imagens", error)
            res.status(500).json({error: "Erro ao buscar as imagens"})
        }
    }

    public getImagesByCategory = async(req: Request, res: Response) => {
        try{
            const category = req.query.category?.toString().toUpperCase() as keyof typeof MediaCategory

            const imgs = await this.prisma.mediaImage.findMany({
                where: {
                    category: MediaCategory[category]            
                }
            })

            if(imgs.length === 0)return {message: "Não existem imagens com essa categoria"}

            res.status(200).json(imgs)
        }catch(error){
            console.error("Erro ao buscar as imagens", error)
            res.status(500).json({error: "Erro ao buscar as imagens"})
        }
    }

    public getImagesByRoomType = (req: Request, res: Response) => {
        try{

        }catch(error){
            console.error("Erro ao buscar as imagens", error)
            res.status(500).json({error: "Erro ao buscar as imagens"})
        }
    }
}
