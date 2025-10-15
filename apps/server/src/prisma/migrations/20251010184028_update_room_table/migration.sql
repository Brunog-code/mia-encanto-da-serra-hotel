/*
  Warnings:

  - You are about to drop the column `status` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "status";

-- DropEnum
DROP TYPE "public"."RoomStatus";
