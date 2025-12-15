/*
  Warnings:

  - Added the required column `sellerId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Review" ADD COLUMN     "sellerId" INTEGER NOT NULL;
