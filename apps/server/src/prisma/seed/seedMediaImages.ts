// import { PrismaClient, MediaCategory, Prisma  } from "@prisma/client";
// import cloudinary from "cloudinary";

// import dotenv from "dotenv";
// dotenv.config();

// const prisma = new PrismaClient();

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// async function main() {
//   //Defina suas pastas e categorias
//   const pastas = [
//     { prefix: "hotel", category: MediaCategory.HOTEL },
//     { prefix: "activities", category: MediaCategory.ACTIVITY },
//     { prefix: "restaurant", category: MediaCategory.RESTAURANT },
//     { prefix: "room/luxury", category: MediaCategory.ROOM },
//   ];

//   // usar o tipo oficial do Prisma
// const mediaData: Prisma.MediaImageCreateInput[] = [];

//   for (const pasta of pastas) {
//     const result = await cloudinary.v2.api.resources({
//       type: "upload",
//       prefix: pasta.prefix,
//       max_results: 100,
//     });

//     type CloudinaryImage = {
//         public_id: string;
//         secure_url: string;
//     };

//     result.resources.forEach((img: CloudinaryImage) => {
//       mediaData.push({
//         category: pasta.category,
//         url: img.secure_url,
//         title: img.public_id.split("/").pop()!, // pega o nome do arquivo
//         roomTypeId: null, 
//       });
//     });
//   }

//   // Inserir no banco
//   for (const media of mediaData) {
//     await prisma.mediaImage.create({
//       data: media,
//     });
//   }

//   console.log("Seed de imagens concluído!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
