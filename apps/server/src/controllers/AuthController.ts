import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { loginSchema } from "../shared/src/lib/zod/authSchema.js";
import { forgotPasswordSchema } from "../shared/src/lib/zod/forgotPasswordSchema.js";
import { resetPasswordSchema } from "../shared/src/lib/zod/resetPasswordSchema.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateToken } from "../utils/lib/generateToken.js";
import { sendEmail } from "../services/emailService.js";
import { db } from "../lib/prisma.js";

export class AuthController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = db;
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      //1-validar dados zod
      const parseData = loginSchema.safeParse(req.body);
      if (!parseData.success) {
        const flattened = parseData.error.flatten();
        return res.status(400).json({
          message: "Dados inválidos",
          fieldErrors: flattened.fieldErrors, //erros por campo
          formErrors: flattened.formErrors, //erros globais
        });
      }

      //2-verificar se o email existe
      const user = await this.prisma.customer.findFirst({
        where: {
          email,
        },
      });

      if (!user)
        return res.status(400).json({ message: "Email não encontrado" });

      //3-verificar se a senha está correta
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ message: "Senha inválida" });

      //4-user e senhna validados, gerar o token e devolver para o frontend
      const token = generateToken(user);
      res.json({ token });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  public getMe = async (req: Request, res: Response) => {
    try {
      const user = req.user;

      if (!user)
        return res.status(401).json({ message: "Usuário não autenticado" });

      //devolvee o usuario pro context
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar usuário autenticado" });
    }
  };

  public forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      //1-validar email com zod
      const parseData = forgotPasswordSchema.safeParse(req.body);
      if (!parseData.success) {
        const flattened = parseData.error.flatten();
        return res.status(400).json({
          message: "Email inválido",
          fieldErrors: flattened.fieldErrors, //erros por campo
          formErrors: flattened.formErrors, //erros globais
        });
      }

      //2-verificar se o email existe no db
      const user = await this.prisma.customer.findUnique({
        where: { email },
      });

      if (!user)
        return res.status(400).json({ message: "Usuário não encontrado" });

      //3-se existir, cria um token de redefinicao aleatorio e a expiracao
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetPasswordExpires = new Date(Date.now() + 3600000);

      //4-salva hash do token
      const resetTokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      //5-atribui o token de expiração ao usuário
      await this.prisma.customer.update({
        where: {
          id: user.id,
        },
        data: {
          resetPasswordToken: resetTokenHash,
          resetPasswordExpires: resetPasswordExpires,
        },
      });

      //6-montar link de redefinição de senha
      const resetLink = `${process.env.FRONTEND_URL}/redefinir-senha/${resetToken}`;

      //7-usar o emailService para enviar o email
      await sendEmail({
        to: email,
        subject: "Redefinição de senha",
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
                `,
      });

      //8-resposta de sucesso
      return res.status(200).json({ message: `Email de redefinição enviado` });
    } catch (error) {
      console.error("Erro no forgotPassword:", error);
      res
        .status(500)
        .json({ message: "Erro interno ao solicitar redefinição" });
    }
  };

  public resetPassword = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      //1-verificar se esta chegando token e pass
      if (!token)
        return res.status(400).json({ mesage: "Token não informado" });
      if (!password)
        return res.status(400).json({ mesage: "Senha não informada" });

      //2-validar password com zod
      const parseData = resetPasswordSchema.safeParse(req.body);
      if (!parseData.success) {
        const flattened = parseData.error.flatten();
        return res.status(400).json({
          message: "Senha inválida",
          fieldErrors: flattened.fieldErrors, //erros por campo
          formErrors: flattened.formErrors, //erros globais
        });
      }

      //3-gerar hash do token enviado para comparar com o hash no banco
      const resetTokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      //4-procurar usuário com token válido e não expirado
      const user = await this.prisma.customer.findFirst({
        where: {
          resetPasswordToken: resetTokenHash,
          resetPasswordExpires: {
            gte: new Date(), //só retorna se o token não expirou, se for > ou = a agora, é valido.
          },
        },
      });

      if (!user)
        return res.status(400).json({ message: "Token inválido ou expirado" });

      //5-gerar hash na newPassword
      const saltRounds = 10;
      const newPasswordHash = await bcrypt.hash(password, saltRounds);

      //6-atualizar a senha no db e remover token e expiração
      await this.prisma.customer.update({
        where: {
          id: user.id,
        },
        data: {
          password: newPasswordHash,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      });

      return res.status(200).json({ message: "Senha redefinida com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro interno ao redefinir a senha" });
    }
  };
}
