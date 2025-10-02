import { PrismaClient, RoomStatus, RoomCategory } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedRooms() {
  //Pegar os RoomTypes do banco
  const luxuryType = await prisma.roomType.findUnique({
    where: { category: RoomCategory.LUXURY }
  });
  const standardType = await prisma.roomType.findUnique({
    where: { category: RoomCategory.STANDARD }
  });

  if (!luxuryType || !standardType) {
    throw new Error("RoomTypes não encontrados. Rode o seed de RoomTypes antes.");
  }

  const roomsData: { number: string; capacity: number; status: RoomStatus; typeId: string }[] = [];

  //20 quartos luxo: 15 com capacidade 6, 5 com capacidade 4
  for (let i = 1; i <= 15; i++) {
    roomsData.push({ number: i.toString(), capacity: 6, status: RoomStatus.AVAILABLE, typeId: luxuryType.id });
  }
  for (let i = 16; i <= 20; i++) {
    roomsData.push({ number: i.toString(), capacity: 4, status: RoomStatus.AVAILABLE, typeId: luxuryType.id });
  }

  // 15 quartos standard: 10 com capacidade 6, 5 com capacidade 4
  for (let i = 21; i <= 30; i++) {
    roomsData.push({ number: i.toString(), capacity: 6, status: RoomStatus.AVAILABLE, typeId: standardType.id });
  }
  for (let i = 31; i <= 35; i++) {
    roomsData.push({ number: i.toString(), capacity: 4, status: RoomStatus.AVAILABLE, typeId: standardType.id });
  }

  // Criar no banco
  for (const room of roomsData) {
    await prisma.room.upsert({
      where: { number: room.number.toString() }, //number é único
      update: {}, //se já existir, não faz nada
      create: room,
    });
  }

  console.log("Seed de Rooms concluído!");
}
