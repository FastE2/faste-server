/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Payment` table. All the data in the column will be lost.
  - Made the column `paymentId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_transactionId_fkey";

-- DropIndex
DROP INDEX "public"."Payment_transactionId_idx";

-- DropIndex
DROP INDEX "public"."Payment_transactionId_key";

-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "paymentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "transactionId";

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
