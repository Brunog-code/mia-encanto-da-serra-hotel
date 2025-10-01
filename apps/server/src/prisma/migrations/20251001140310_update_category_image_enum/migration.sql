/*
  Warnings:

  - The values [ACITIVIE] on the enum `MediaCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."MediaCategory_new" AS ENUM ('HOTEL', 'ACTIVITY', 'RESTAURANT', 'ROOM');
ALTER TABLE "public"."MediaImage" ALTER COLUMN "category" TYPE "public"."MediaCategory_new" USING ("category"::text::"public"."MediaCategory_new");
ALTER TYPE "public"."MediaCategory" RENAME TO "MediaCategory_old";
ALTER TYPE "public"."MediaCategory_new" RENAME TO "MediaCategory";
DROP TYPE "public"."MediaCategory_old";
COMMIT;
