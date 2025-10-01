import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
});

export type newsletterFormData = z.infer<typeof newsletterSchema>;
