/*
  Warnings:

  - You are about to drop the column `status` on the `AddressShip` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."AddressShip_status_idx";

-- AlterTable
ALTER TABLE "public"."AddressShip" DROP COLUMN "status";
