import cron from "node-cron";
import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Função que cancela reservas pendentes há mais de 24h
export async function cancelOldReservations() {
  const limitDate = dayjs().subtract(24, "hour").toDate();

  try {
    const result = await prisma.reservation.updateMany({
      where: {
        status: "PENDING",
        createdAt: { lte: limitDate },
      },
      data: { status: "CANCELED" },
    });

    if (result.count > 0) {
      console.log(
        `🚫 ${result.count} reservas foram canceladas automaticamente.`
      );
    } else {
      console.log("✅ Nenhuma reserva pendente para cancelar.");
    }
  } catch (err) {
    console.error("Erro ao cancelar reservas automaticamente:", err);
  }
}

//Rodar automaticamente quando o servidor estiver ativo (para uso local ou produção 24/7)
cron.schedule("0 * * * *", cancelOldReservations);
