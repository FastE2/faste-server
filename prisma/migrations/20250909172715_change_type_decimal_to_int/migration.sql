/*
  Warnings:

  - You are about to alter the column `latitude` on the `AddressShip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,7)` to `Integer`.
  - You are about to alter the column `longitude` on the `AddressShip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,7)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."AddressShip" ALTER COLUMN "latitude" SET DATA TYPE INTEGER,
ALTER COLUMN "longitude" SET DATA TYPE INTEGER;
