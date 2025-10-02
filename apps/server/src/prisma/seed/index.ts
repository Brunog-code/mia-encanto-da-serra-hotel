import { PrismaClient } from "@prisma/client";
import { seedRoomTypes } from "./seedRoomTypes.js";
import { seedRooms } from "./seedRooms.js";
import { seedMediaImages } from "./seedMediaImages.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seeds...");

  await seedRoomTypes();
  await seedRooms();
  await seedMediaImages();

  console.log("✅ Seeds concluídos com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao rodar seeds:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
