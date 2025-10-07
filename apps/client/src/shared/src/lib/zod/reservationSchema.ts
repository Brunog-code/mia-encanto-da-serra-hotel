import { z } from "zod";
import dayjs from "dayjs";

export const reservationSchema = z
  .object({
    checkin: z.string().nonempty("Informe a data de check-in"),
    checkout: z.string().nonempty("Informe a data de check-out"),
    guests: z.string().nonempty("Selecione o número de hóspedes"),
  })
  .refine(
    (data) => {
      if (!data.checkin || !data.checkout) return true;

      const checkInDate = dayjs(data.checkin);
      const checkOutDate = dayjs(data.checkout);

      return checkInDate.isBefore(checkOutDate, "day");
    },
    {
      message: "Check-in não pode ser maior que o check-out",
      path: ["checkout"],
    }
  )
  .refine(
    (data) => {
      if (!data.checkin) return true;

      const checkInDate = dayjs(data.checkin);
      const today = dayjs();

      return (
        checkInDate.isAfter(today, "day") || checkInDate.isSame(today, "day")
      );
    },
    {
      message: "Check-in não pode ser anterior ao dia de hoje",
      path: ["checkin"],
    }
  )
  .refine(
    (data) => {
      if (!data.checkout) return true;

      const checkOutDate = dayjs(data.checkout);
      const today = dayjs();

      return (
        checkOutDate.isAfter(today, "day") || checkOutDate.isSame(today, "day")
      );
    },
    {
      message: "Check-out não pode ser anterior ao dia de hoje",
      path: ["checkout"],
    }
  );

export type reservationFormData = z.infer<typeof reservationSchema>;
