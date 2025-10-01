-- CreateEnum
CREATE TYPE "public"."MediaCategory" AS ENUM ('HOTEL', 'ACITIVIE', 'RESTAURANT', 'ROOM');

-- CreateTable
CREATE TABLE "public"."MediaImage" (
    "id" TEXT NOT NULL,
    "category" "public"."MediaCategory" NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomTypeId" TEXT,

    CONSTRAINT "MediaImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MediaImage" ADD CONSTRAINT "MediaImage_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "public"."RoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
