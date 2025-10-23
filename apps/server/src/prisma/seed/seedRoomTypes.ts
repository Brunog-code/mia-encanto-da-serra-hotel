import { PrismaClient, RoomCategory } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedRoomTypes() {
  //Criar os dois RoomTypes
  const roomTypes = [
    {
      category: RoomCategory.STANDARD,
      description:
        "Quarto confortável com cama queen-size, decoração moderna, Wi-Fi gratuito e café da manhã incluso. Ideal para viajantes a negócios ou lazer.",
      price: 850.0,
      capacity: 6,
      amenities: [
        "Wi-Fi gratuito",
        "Banheira de hidromassagem",
        "Ar-condicionado",
        "Smart TV 55",
        "Mesa de trabalho",
        "Cofre individual",
        "Secador de cabelo",
        "Frigobar simples",
        "Estacionamento gratuito",
      ],
    },
    {
      category: RoomCategory.LUXURY,
      description:
        "Quarto espaçoso com decoração elegante, cama king-size, varanda com vista para as montanhas, Wi-Fi gratuito e café da manhã incluso.",
      price: 1450.0,
      capacity: 6,
      amenities: [
        "Banheira de hidromassagem",
        "Lareira privativa",
        "Vista para a montanha",
        "Minibar com bebidas selecionadas",
        "Sistema de som Bluetooth",
        "Área de estar com sofá confortável",
        "Produtos de banho de luxo",
        "Smart TV 85",
        "Roupa de cama premium",
        "Estacionamento gratuito",
      ],
    },
  ];

  for (const type of roomTypes) {
    await prisma.roomType.upsert({
      where: { category: type.category }, //garante que não duplica se rodar mais de uma vez
      update: { price: type.price },
      create: type,
    });
  }

  console.log("Seed de RoomTypes concluído!");
}
