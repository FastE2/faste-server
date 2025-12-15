/*
  Warnings:

  - You are about to drop the column `content` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `deletedById` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `revieweeId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Review` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceSeller` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceShip` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ReviewBadReason" AS ENUM ('DAMAGED_PRODUCT', 'FAKE_PRODUCT', 'NOT_AS_DESCRIBED', 'POOR_QUALITY');

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_createdById_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_deletedById_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_revieweeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_updatedById_fkey";

-- DropIndex
DROP INDEX "public"."Review_createdById_idx";

-- DropIndex
DROP INDEX "public"."Review_revieweeId_idx";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "rating1Count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating2Count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating3Count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating4Count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating5Count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Review" DROP COLUMN "content",
DROP COLUMN "createdById",
DROP COLUMN "deletedAt",
DROP COLUMN "deletedById",
DROP COLUMN "revieweeId",
DROP COLUMN "updatedById",
ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "reason" "public"."ReviewBadReason",
ADD COLUMN     "serviceSeller" INTEGER NOT NULL,
ADD COLUMN     "serviceShip" INTEGER NOT NULL,
ADD COLUMN     "skuId" INTEGER,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Product_shopId_idx" ON "public"."Product"("shopId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "public"."Review"("userId");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "public"."Review"("productId");

-- CreateIndex
CREATE INDEX "Review_skuId_idx" ON "public"."Review"("skuId");
