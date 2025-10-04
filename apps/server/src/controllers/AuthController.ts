import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { loginSchema } from "../shared/src/lib/zod/authSchema.js";
import bcrypt from "bcrypt";

import { generateToken } from "../utils/lib/generateToken.js";

export class AuthController {
    private prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }

    public login = async(req: Request, res: Response) =>{
        const {email, password} = req.body

        //1-validar dados zod
        const parseData = loginSchema.safeParse(req.body)
        if(!parseData.success){
            const flattened = parseData.error.flatten()
            return res.status(400).json({
                message: "Dados inválidos",
                fieldErrors: flattened.fieldErrors, //erros por campo
                formErrors: flattened.formErrors,   //erros globais
            })
        }

        //2-verificar se o email existe
        const user = await this.prisma.customer.findFirst({
            where:{
                email
            }
        })

        if(!user) return res.status(400).json({message: "Email não encontrado"})

        //3-verificar se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(401).json({message: "Senha inválida"})

        //4-user e senhna validados, gerar o token e devolver para o frontend
        const token = generateToken(user)
        res.json({token})
        console.log(token)

 
    }
}