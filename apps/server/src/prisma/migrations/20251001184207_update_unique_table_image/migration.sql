/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `MediaImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MediaImage_url_key" ON "public"."MediaImage"("url");
