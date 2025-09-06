-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_paymentId_fkey";

-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "paymentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
