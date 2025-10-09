import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { registerSchema } from "../shared/src/lib/zod/authSchema.js";

export class UserController {
    private prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }

    public create = async(req: Request, res: Response) => {
        try{
            const {name, email, phone, password} = req.body

            //1-validar dados com o zod
            const parseData = registerSchema.safeParse(req.body)
            if(!parseData.success){
                const flattened = parseData.error.flatten(); 
                return res.status(400).json({
                    message: "Dados inválidos",
                    fieldErrors: flattened.fieldErrors, //erros por campo
                    formErrors: flattened.formErrors,   //erros globais
                })
            }

            //2-verificar se existe email ou phone ja cadastrado
            const emailExists = await this.prisma.customer.findFirst({
                where:{
                    email
                }
            }) 

            const phoneExists = await this.prisma.customer.findFirst({
                where:{
                    phone
                }
            })

            if(emailExists) return res.status(400).json({message: "Email ja cadastrado"})
                
            if(phoneExists)return res.status(400).json({message: "Telefone ja cadastrado"})
                
            //3-hashear password usando bcrypt
            //gera um salt (mais seguro, aumenta o tempo de hash)
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            //4-salva no banco usando o hashedPassword
            const user = await this.prisma.customer.create({
                data: {
                    name,
                    email,
                    phone,
                    password: hashedPassword
                }
            })
            return res.status(200).json({message: "Usuario criado com sucesso", userId: user.id})
         }catch(error){
            console.error(error)
            return res.status(500).json({ message: "Erro ao criar usuário" });
         }
    }

    public getUserById = async(req: Request, res: Response) => {
        try{
            const {id} = req.params

            const user = await this.prisma.customer.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                }
            })

            if(!user) return res.status(404).json({message: "Usuario não encontrado"})

            return res.status(200).json(user)

        }catch(error){
            console.error(error)
            return res.status(500).json({message: "Erro ao buscar usuário"})
        }
    }
}