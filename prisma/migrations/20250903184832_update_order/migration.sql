/*
  Warnings:

  - You are about to drop the column `shopOwnerId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_shopOwnerId_fkey";

-- DropIndex
DROP INDEX "public"."Order_userId_key";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "shopOwnerId";

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "public"."Order"("userId");

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "public"."Shop"("ownerId") ON DELETE NO ACTION ON UPDATE NO ACTION;
