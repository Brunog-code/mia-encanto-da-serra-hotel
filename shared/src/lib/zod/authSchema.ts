import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(10, "Telefone inválido").max(11, "Telefone inválido"),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
