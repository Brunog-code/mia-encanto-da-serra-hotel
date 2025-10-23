import { PrismaClient, MediaCategory } from "@prisma/client";
import { Request, Response } from "express";
import { db } from "../lib/prisma.js";

export class ImageController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = db;
  }

  // Arrow function mantém o "this" correto
  public getImages = async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const titleParam = req.query.title || req.query["title[]"];
      let where: any = {};

      //Lógica para filtro por Categoria
      if (category) {
        const cat = category
          .toString()
          .toUpperCase() as keyof typeof MediaCategory;
        where.category = MediaCategory[cat];
      }

      //Lógica para filtro por Título
      if (titleParam) {
        const titles = Array.isArray(titleParam) ? titleParam : [titleParam];
        where.title = {
          in: titles as string[],
        };
      }

      //Buscar as imagens aplicando o objeto 'where' que contem o filtro(se nao tiver filtro retorna tudo)
      const imgs = await this.prisma.mediaImage.findMany({ where });

      if (imgs.length === 0) {
        return res
          .status(404)
          .json({
            message: "Nenhuma imagem encontrada com os filtros especificados.",
          });
      }

      res.status(200).json(imgs);
    } catch (error) {
      console.error("Erro ao buscar as imagens", error);
      res.status(500).json({ error: "Erro ao buscar as imagens" });
    }
  };
}
