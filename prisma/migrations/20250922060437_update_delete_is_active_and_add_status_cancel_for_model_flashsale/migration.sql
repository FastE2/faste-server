/*
  Warnings:

  - You are about to drop the column `isActive` on the `FlashSale` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "public"."FlashSaleStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "public"."FlashSale" DROP COLUMN "isActive";
