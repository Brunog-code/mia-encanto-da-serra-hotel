import { z } from "zod";
import dayjs from "dayjs";

//Função auxiliar para validar se a data é hoje ou depois
const isTodayOrAfter = (dateStr: string) => {
  const date = dayjs(dateStr);
  const today = dayjs();
  return date.isSame(today, "day") || date.isAfter(today, "day");
};

export const paymentSchema = z
  .object({
    idReservation: z.string().nonempty("ID da reserva é obrigatório"),
    chekeInReservation: z.string().nonempty("Informe a data de check-in"),
    chekeOutReservation: z.string().nonempty("Informe a data de check-out"),
    roomCategory: z.string().nonempty("Informe a categoria do quarto"),
    totalAmountReservation: z
      .number("Valor total deve ser um número")
      .positive("Valor total deve ser positivo"),
    userName: z.string().nonempty("Informe o nome do usuário"),
    userEmail: z
      .string()
      .nonempty("Informe o e-mail do usuário")
      .email("E-mail inválido"),
    userPhone: z.string().nonempty("Informe o telefone do usuário"),
  })
  // Valida check-in antes do check-out
  .refine(
    (data) => {
      if (!data.chekeInReservation || !data.chekeOutReservation) return true;
      const checkInDate = dayjs(data.chekeInReservation);
      const checkOutDate = dayjs(data.chekeOutReservation);
      return checkInDate.isBefore(checkOutDate, "day");
    },
    {
      message: "Check-in não pode ser maior que o check-out",
      path: ["chekeOutReservation"],
    }
  )
  // Check-in não pode ser anterior a hoje
  .refine(
    (data) =>
      !data.chekeInReservation || isTodayOrAfter(data.chekeInReservation),
    {
      message: "Check-in não pode ser anterior ao dia de hoje",
      path: ["chekeInReservation"],
    }
  )
  // Check-out não pode ser anterior a hoje
  .refine(
    (data) =>
      !data.chekeOutReservation || isTodayOrAfter(data.chekeOutReservation),
    {
      message: "Check-out não pode ser anterior ao dia de hoje",
      path: ["chekeOutReservation"],
    }
  );

export type PaymentFormData = z.infer<typeof paymentSchema>;
