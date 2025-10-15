-- CreateEnum
CREATE TYPE "public"."RoomStatus" AS ENUM ('AVAILABLE', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "public"."Room" ADD COLUMN     "status" "public"."RoomStatus" NOT NULL DEFAULT 'AVAILABLE';
