/*
  Warnings:

  - You are about to drop the column `price` on the `DeliveryType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `DeliveryType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `DeliveryType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."DeliveryType_name_key";

-- AlterTable
ALTER TABLE "public"."DeliveryType" DROP COLUMN "price",
ADD COLUMN     "basePrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "countryCode" TEXT NOT NULL DEFAULT 'VN',
ADD COLUMN     "estimatedTime" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pricePerKg" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryType_code_key" ON "public"."DeliveryType"("code");
