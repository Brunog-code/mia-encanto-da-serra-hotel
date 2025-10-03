import { PrismaClient, MediaCategory } from "@prisma/client";
import { Request, Response } from "express";

export class ImageController {
private prisma: PrismaClient;

constructor() {
    this.prisma = new PrismaClient();
}

// Arrow function mantém o "this" correto
public getImages = async(req: Request, res: Response) => {
    try{
        const {category } = req.query
        const titleParam = req.query.title || req.query['title[]']
        let where:any = {}

        //Lógica para filtro por Categoria
        if(category){
            const cat = category.toString().toUpperCase() as keyof typeof MediaCategory
            where.category = MediaCategory[cat]
        }

        //Lógica para filtro por Título
        if(titleParam){
            const titles = Array.isArray(titleParam) ? titleParam : [titleParam]
            where.title = {
                in: titles as string[]
            }
        }

        //Buscar as imagens aplicando o objeto 'where' que contem o filtro
        const imgs = await this.prisma.mediaImage.findMany({where})

        if(imgs.length === 0){
            return res.status(404).json({ message: "Nenhuma imagem encontrada com os filtros especificados."})     
        }

        res.status(200).json(imgs)
    }catch(error){
        console.error("Erro ao buscar as imagens", error);
        res.status(500).json({ error: "Erro ao buscar as imagens" });
    }
}



    // public getAllImages = async(req: Request, res: Response) => {
    //     try{
    //         const imgs = await this.prisma.mediaImage.findMany()

    //         if(imgs.length === 0)return {message: "Não existem imagens"}

    //         res.status(200).json(imgs)

    //     }catch(error){
    //         console.error("Erro ao buscar as imagens", error)
    //         res.status(500).json({error: "Erro ao buscar as imagens"})
    //     }
    // }

    // public getImagesByCategory = async(req: Request, res: Response) => {
    //     try{
    //         const category = req.query.category?.toString().toUpperCase() as keyof typeof MediaCategory

    //         const imgs = await this.prisma.mediaImage.findMany({
    //             where: {
    //                 category: MediaCategory[category]            
    //             }
    //         })

    //         if(imgs.length === 0)return {message: "Não existem imagens com essa categoria"}

    //         res.status(200).json(imgs)
    //     }catch(error){
    //         console.error("Erro ao buscar as imagens", error)
    //         res.status(500).json({error: "Erro ao buscar as imagens"})
    //     }
    // }

    // public getImagesByTitle = async(req: Request, res: Response) => {
    //     try{
    //         const {title} = req.query

    //         if(!title) return res.status(400).json({message: "Nenhum título enviado"})

    //         //pode vir como string ou array, se for array mantem, se nao, trasnforma em array
    //         const titles = Array.isArray(title) ? title : [title];

    //         const imgs = await this.prisma.mediaImage.findMany({
    //             where: {
    //                 title: {
    //                     in: titles as string[]
    //                 }
    //             }
    //         })

    //         if(imgs.length === 0)return {message: "Não existem imagens com esse titulo"}

    //         res.status(200).json(imgs)
    //     }catch(error){
    //         console.error("Erro ao buscar as imagens", error)
    //         res.status(500).json({error: "Erro ao buscar as imagens"})
    //     }
    // }

    // public getImagesByRoomType = async(req: Request, res: Response) => {
    //     try{
    //         const imgs = await this.prisma.roomType.findMany({
    //             include:{
    //                 mediaImages: true
    //             }
    //         })

    //         if(imgs.length === 0) return {message: "Não existem tipos de quarto cadastrados"}

    //         //converte par Number o price
    //         const rooms = imgs.map(room => ({
    //             ...room,
    //             price: Number(room.price)
    //         }))

    //         return res.status(200).json(rooms)
    //     }catch(error){
    //         console.error("Erro ao buscar as imagens", error)
    //         res.status(500).json({error: "Erro ao buscar as imagens"})
    //     }
    // }
}
