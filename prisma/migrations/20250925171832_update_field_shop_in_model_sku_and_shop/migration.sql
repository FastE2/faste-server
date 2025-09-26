/*
  Warnings:

  - You are about to drop the column `createdById` on the `SKU` table. All the data in the column will be lost.
  - Added the required column `shopId` to the `SKU` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."SKU" DROP CONSTRAINT "SKU_createdById_fkey";

-- AlterTable
ALTER TABLE "public"."SKU" DROP COLUMN "createdById",
ADD COLUMN     "shopId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."SKU" ADD CONSTRAINT "SKU_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "public"."Shop"("shopid") ON DELETE CASCADE ON UPDATE NO ACTION;
