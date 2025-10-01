/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `RoomType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RoomType_category_key" ON "public"."RoomType"("category");
