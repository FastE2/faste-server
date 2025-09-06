/*
  Warnings:

  - Added the required column `shopId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopOwnerId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "shopId" INTEGER NOT NULL,
ADD COLUMN     "shopOwnerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_shopOwnerId_fkey" FOREIGN KEY ("shopOwnerId") REFERENCES "public"."Shop"("ownerId") ON DELETE NO ACTION ON UPDATE NO ACTION;
