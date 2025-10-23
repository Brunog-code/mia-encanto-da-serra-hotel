import { PrismaClient } from "@prisma/client";

//1.Declaração global (apenas para o TypeScript)
declare global {
  var prisma: PrismaClient | undefined;
}

//2.Criação da instância
const prisma = global.prisma || new PrismaClient();

//3.Lógica de ambiente
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

//instância única
export const db = prisma;
