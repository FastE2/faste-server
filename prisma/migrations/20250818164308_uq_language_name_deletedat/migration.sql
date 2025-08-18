/*
  Warnings:

  - A unique constraint covering the columns `[name,deletedAt]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "uq_language_name_deletedat" ON "public"."Language"("name", "deletedAt");
