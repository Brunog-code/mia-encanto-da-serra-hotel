import { z } from "zod";

export const reservationSchema = z.object({
  checkin: z.string().min(1, "Informe a data de check-in"),
  checkout: z.string().min(1, "Informe a data de check-out"),
  guests: z.string().min(1, "Selecione o número de hóspedes"),
});

export type reservationFormData = z.infer<typeof reservationSchema>;
