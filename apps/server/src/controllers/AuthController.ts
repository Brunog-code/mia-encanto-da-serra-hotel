import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { loginSchema } from "../shared/src/lib/zod/authSchema.js";
import { forgotPasswordSchema } from "../shared/src/lib/zod/forgotPasswordSchema.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateToken } from "../utils/lib/generateToken.js";
import { sendEmail } from "../services/emailService.js";

export class AuthController {
    private prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }

    public login = async(req: Request, res: Response) =>{
        try{
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
        }catch(error){
            console.error("Erro no login:", error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    public getMe = async(req: Request, res:Response) => {
        try{
            const user = req.user

            if(!user)return res.status(401).json({message: "Usuário não autenticado"})

                //devolvee o usuario pro context
            return res.status(200).json({user})
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Erro ao buscar usuário autenticado" });
        }
    }

    public forgotPassword = async(req: Request, res:Response) => {
        try{

            const {email} = req.body
            
            //1-validar email com zod
             const parseData = forgotPasswordSchema.safeParse(req.body)
                if(!parseData.success){
                    const flattened = parseData.error.flatten()
                    return res.status(400).json({
                        message: "Email inválido",
                        fieldErrors: flattened.fieldErrors, //erros por campo
                        formErrors: flattened.formErrors,   //erros globais
                    })
                }
    
            //2-verificar se o email existe no db
            const user = await this.prisma.customer.findUnique({
                where: {email}
            })
    
            if(!user) return res.status(400).json({message: "Usuário não encontrado"})
    
            //3-se existir, cria um token de redefinicao aleatorio e a expiracao
            const resetToken = crypto.randomBytes(32).toString('hex')
            const resetPasswordExpires = new Date(Date.now() + 3600000)
    
            //4-salva hash do token
            const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex')
    
            //5-atribui o token de expiração ao usuário
            await this.prisma.customer.update({
                where: {
                    id: user.id
                },
                data: {
                    resetPasswordToken: resetTokenHash,
                    resetPasswordExpires: resetPasswordExpires
                }
            })
    
            //6-montar link de redefinição de senha
            const resetLink = `${process.env.FRONTEND_URL}/redefinir-senha/${resetToken}`
    
            //7-usar o emailService para enviar o email
            await sendEmail({
                to: email,
                subject:'Redefinição de senha',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h2>Redefinição de senha</h2>
                        <p>Olá <strong>${user.name}</strong>,</p>
                        <p>Recebemos uma solicitação para redefinir a senha da sua conta. Para continuar o processo, clique no link abaixo:</p>
                        <p>
                            <a href="${resetLink}" 
                            style="display: inline-block; background-color: #c78d38; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
                            Redefinir minha senha
                            </a>
                        </p>
                        <p>Ou copie e cole o seguinte link no seu navegador:</p>
                        <p><a href="${resetLink}">${resetLink}</a></p>
                        <p><em>Este link é válido por 1 hora.</em></p>
                        <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
                        <p style="font-size: 14px; color: #666;">
                            Se você não solicitou a redefinição de senha, ignore este e-mail. Sua conta permanecerá segura.
                        </p>
                        <p>Atenciosamente,<br>Equipe de Suporte</p>
                    </div>
                `
            })
    
    
            //8-resposta de sucesso
            return res.status(200).json({message: `Email de redefinição enviado`})
        }catch(error){
            console.error("Erro no forgotPassword:", error);
            res.status(500).json({ message: "Erro interno ao solicitar redefinição" });
        }
    }

    public resetPassword = async(req: Request, res:Response) => {

    }
}