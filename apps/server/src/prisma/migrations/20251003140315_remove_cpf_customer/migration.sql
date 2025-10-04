/*
  Warnings:

  - You are about to drop the column `cpf` on the `Customer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Customer_cpf_key";

-- AlterTable
ALTER TABLE "public"."Customer" DROP COLUMN "cpf";
