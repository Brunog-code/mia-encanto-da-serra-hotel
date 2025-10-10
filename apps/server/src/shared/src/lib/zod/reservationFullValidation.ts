//validacao da reserva completa
import {z} from 'zod'
import dayjs from 'dayjs'

export const reservationFullValidation = z.object({
    checkIn: z.string().refine((val) => dayjs(val).isValid(), {
        message: "Data de check-in inválida",
    }),
    checkOut: z.string().refine((val) => dayjs(val).isValid(), {
        message: "Data de check-out inválida",
    }),
    guestCount: z
    .string()
    .or(z.number())
    .refine((val) => Number(val) > 0, "Número de hóspedes deve ser maior que 0"),
    totalAmount: z.number().positive("Valor total inválido"),
    customerId: z.string().uuid("ID de cliente inválido"),
    roomTypeId: z.string().uuid("ID do tipo de quarto inválido"),
})
.refine(
  (data) => dayjs(data.checkIn).isBefore(dayjs(data.checkOut), "day"),
  {
    message: "Check-in não pode ser maior que o check-out",
    path: ["checkOut"],
  }
)

export type reservationFullValidationSchema = z.infer<typeof reservationFullValidation>