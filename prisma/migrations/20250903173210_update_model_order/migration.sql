/*
  Warnings:

  - You are about to drop the column `addressShip` on the `Order` table. All the data in the column will be lost.
  - Added the required column `addressShipId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "addressShip",
ADD COLUMN     "addressShipId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_addressShipId_fkey" FOREIGN KEY ("addressShipId") REFERENCES "public"."AddressShip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
