/*
  Warnings:

  - The primary key for the `Shop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ownerId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `businessType` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopid` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxCode` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BusinessType" AS ENUM ('INDIVIDUAL', 'BUSINESS_HOUSEHOLD', 'COMPANY');

-- DropForeignKey
ALTER TABLE "public"."BannerDesign" DROP CONSTRAINT "BannerDesign_shopId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_shopId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Shop" DROP CONSTRAINT "Shop_ownerId_fkey";

-- DropIndex
DROP INDEX "public"."Shop_ownerId_idx";

-- DropIndex
DROP INDEX "public"."Shop_slug_idx";

-- DropIndex
DROP INDEX "public"."Shop_slug_key";

-- AlterTable
ALTER TABLE "public"."DeliveryType" ADD COLUMN     "shopShopid" INTEGER;

-- AlterTable
ALTER TABLE "public"."Shop" DROP CONSTRAINT "Shop_pkey",
DROP COLUMN "ownerId",
DROP COLUMN "slug",
ADD COLUMN     "addressShipId" INTEGER,
ADD COLUMN     "businessType" "public"."BusinessType" NOT NULL,
ADD COLUMN     "cover" TEXT,
ADD COLUMN     "followerCount" INTEGER,
ADD COLUMN     "itemCount" INTEGER DEFAULT 0,
ADD COLUMN     "paymentMethods" "public"."PaymentMethod"[],
ADD COLUMN     "ratingStar" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "responseRate" INTEGER DEFAULT 100,
ADD COLUMN     "responseTime" INTEGER DEFAULT 0,
ADD COLUMN     "shopid" INTEGER NOT NULL,
ADD COLUMN     "taxCode" VARCHAR(14) NOT NULL,
ALTER COLUMN "logo" DROP NOT NULL,
ALTER COLUMN "banner" DROP NOT NULL,
ALTER COLUMN "banner" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shop_pkey" PRIMARY KEY ("shopid");

-- CreateIndex
CREATE INDEX "Shop_shopid_idx" ON "public"."Shop"("shopid");

-- AddForeignKey
ALTER TABLE "public"."DeliveryType" ADD CONSTRAINT "DeliveryType_shopShopid_fkey" FOREIGN KEY ("shopShopid") REFERENCES "public"."Shop"("shopid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "public"."Shop"("shopid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Shop" ADD CONSTRAINT "Shop_shopid_fkey" FOREIGN KEY ("shopid") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Shop" ADD CONSTRAINT "Shop_addressShipId_fkey" FOREIGN KEY ("addressShipId") REFERENCES "public"."AddressShip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BannerDesign" ADD CONSTRAINT "BannerDesign_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "public"."Shop"("shopid") ON DELETE CASCADE ON UPDATE NO ACTION;
