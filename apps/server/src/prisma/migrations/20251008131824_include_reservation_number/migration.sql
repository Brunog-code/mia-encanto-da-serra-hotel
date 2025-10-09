/*
  Warnings:

  - A unique constraint covering the columns `[reservationNumber]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reservationNumber` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Reservation" ADD COLUMN     "reservationNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_reservationNumber_key" ON "public"."Reservation"("reservationNumber");
