/*
  Warnings:

  - You are about to drop the column `cityId` on the `AddressShip` table. All the data in the column will be lost.
  - You are about to drop the column `districtId` on the `AddressShip` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `AddressShip` table. All the data in the column will be lost.
  - You are about to drop the column `wardId` on the `AddressShip` table. All the data in the column will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `divisionId` to the `AddressShip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `divisionPath` to the `AddressShip` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."DivisionLevel" AS ENUM ('COUNTRY', 'STATE', 'CITY', 'DISTRICT', 'WARD');

-- DropForeignKey
ALTER TABLE "public"."AddressShip" DROP CONSTRAINT "AddressShip_cityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AddressShip" DROP CONSTRAINT "AddressShip_districtId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AddressShip" DROP CONSTRAINT "AddressShip_stateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AddressShip" DROP CONSTRAINT "AddressShip_wardId_fkey";

-- DropForeignKey
ALTER TABLE "public"."City" DROP CONSTRAINT "City_stateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."District" DROP CONSTRAINT "District_cityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."District" DROP CONSTRAINT "District_stateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."State" DROP CONSTRAINT "State_countryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."wards" DROP CONSTRAINT "wards_districtId_fkey";

-- DropIndex
DROP INDEX "public"."AddressShip_cityId_idx";

-- DropIndex
DROP INDEX "public"."AddressShip_districtId_idx";

-- DropIndex
DROP INDEX "public"."AddressShip_stateId_idx";

-- DropIndex
DROP INDEX "public"."AddressShip_wardId_idx";

-- AlterTable
ALTER TABLE "public"."AddressShip" DROP COLUMN "cityId",
DROP COLUMN "districtId",
DROP COLUMN "stateId",
DROP COLUMN "wardId",
ADD COLUMN     "divisionId" INTEGER NOT NULL,
ADD COLUMN     "divisionPath" JSONB NOT NULL;

-- DropTable
DROP TABLE "public"."City";

-- DropTable
DROP TABLE "public"."District";

-- DropTable
DROP TABLE "public"."State";

-- DropTable
DROP TABLE "public"."wards";

-- CreateTable
CREATE TABLE "public"."AdministrativeDivision" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "level" "public"."DivisionLevel" NOT NULL,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdministrativeDivision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdministrativeDivision_code_key" ON "public"."AdministrativeDivision"("code");

-- CreateIndex
CREATE INDEX "AdministrativeDivision_level_idx" ON "public"."AdministrativeDivision"("level");

-- CreateIndex
CREATE INDEX "AdministrativeDivision_level_id_idx" ON "public"."AdministrativeDivision"("level", "id");

-- CreateIndex
CREATE INDEX "AdministrativeDivision_parentId_idx" ON "public"."AdministrativeDivision"("parentId");

-- CreateIndex
CREATE INDEX "AddressShip_divisionId_idx" ON "public"."AddressShip"("divisionId");

-- AddForeignKey
ALTER TABLE "public"."AddressShip" ADD CONSTRAINT "AddressShip_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "public"."AdministrativeDivision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdministrativeDivision" ADD CONSTRAINT "AdministrativeDivision_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."AdministrativeDivision"("id") ON DELETE SET NULL ON UPDATE CASCADE;
