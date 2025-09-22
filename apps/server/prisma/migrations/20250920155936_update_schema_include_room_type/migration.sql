/*
  Warnings:

  - The `status` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `paymentId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `dailyRate` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `roomNumber` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reservationId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reservationId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- AlterEnum
ALTER TYPE "public"."ReservationStatus" ADD VALUE 'FINALIZED';

-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_paymentId_fkey";

-- DropIndex
DROP INDEX "public"."Reservation_paymentId_key";

-- DropIndex
DROP INDEX "public"."Room_roomNumber_key";

-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "reservationId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."Reservation" DROP COLUMN "paymentId";

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "capacity",
DROP COLUMN "category",
DROP COLUMN "dailyRate",
DROP COLUMN "description",
DROP COLUMN "roomNumber",
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."paymentstatus";

-- CreateTable
CREATE TABLE "public"."RoomType" (
    "id" TEXT NOT NULL,
    "category" "public"."RoomCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "amenities" TEXT[],

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_reservationId_key" ON "public"."Payment"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_number_key" ON "public"."Room"("number");

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "public"."RoomType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "public"."Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
