/*
  Warnings:

  - The primary key for the `FlashSaleItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `description` to the `FlashSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `FlashSale` table without a default value. This is not possible if the table is not empty.
  - Made the column `addressShipId` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."FlashSaleType" AS ENUM ('SELLER', 'PLATFORM');

-- DropForeignKey
ALTER TABLE "public"."Shop" DROP CONSTRAINT "Shop_addressShipId_fkey";

-- AlterTable
ALTER TABLE "public"."FlashSale" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "type" "public"."FlashSaleType" NOT NULL DEFAULT 'SELLER';

-- AlterTable
ALTER TABLE "public"."FlashSaleItem" DROP CONSTRAINT "FlashSaleItem_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FlashSaleItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Shop" ALTER COLUMN "addressShipId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "FlashSaleItem_deletedAt_idx" ON "public"."FlashSaleItem"("deletedAt");

-- AddForeignKey
ALTER TABLE "public"."Shop" ADD CONSTRAINT "Shop_addressShipId_fkey" FOREIGN KEY ("addressShipId") REFERENCES "public"."AddressShip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
