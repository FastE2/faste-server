/*
  Warnings:

  - You are about to drop the column `skuValue` on the `ProductSKUSnapshot` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skuAttributes` to the `ProductSKUSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "OrderId" INTEGER,
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."ProductSKUSnapshot" DROP COLUMN "skuValue",
ADD COLUMN     "skuAttributes" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "public"."Transaction" ALTER COLUMN "updatedAt" DROP DEFAULT;
