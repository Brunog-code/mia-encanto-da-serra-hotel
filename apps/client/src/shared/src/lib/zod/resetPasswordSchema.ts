import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type resetPasswordFormData = z.infer<typeof resetPasswordSchema>;
