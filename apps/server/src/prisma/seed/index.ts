import { PrismaClient } from "@prisma/client";
import { seedRoomTypes } from "./seedRoomTypes.js";
// import { seedCustomers } from "./seedCustomers"; // futuramente

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seeds...");

  await seedRoomTypes();
//   await seedRooms();
  // await seedCustomers();

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
