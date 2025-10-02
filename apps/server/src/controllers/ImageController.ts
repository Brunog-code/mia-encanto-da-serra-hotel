import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class ImageController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    // Arrow function mantém o "this" correto
    public getAllImages = async (req: Request, res: Response) => {
        try{

        }catch(error){
            console.error("Erro ao buscar as imagens", error)
            res.status(500).json({error: "Erro ao buscar as imagens"})
        }
    }

    public getImagesByCategory = (req: Request, res: Response) => {

    }

    public getImagesByRoomType = (req: Request, res: Response) => {
        
    }
}
