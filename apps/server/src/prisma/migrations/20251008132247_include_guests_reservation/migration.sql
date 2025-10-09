/*
  Warnings:

  - Added the required column `guestCount` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Reservation" ADD COLUMN     "guestCount" INTEGER NOT NULL;
