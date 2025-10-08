/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Shop" ADD COLUMN     "slug" VARCHAR(200);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_slug_key" ON "public"."Shop"("slug");
