/*
  Warnings:

  - You are about to drop the column `quantity` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Payment" ALTER COLUMN "qrCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "quantity";
