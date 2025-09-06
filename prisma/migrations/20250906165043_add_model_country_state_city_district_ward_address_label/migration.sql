/*
  Warnings:

  - You are about to drop the column `city` on the `AddressShip` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `AddressShip` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `AddressShip` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `AddressShip` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `AddressShip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."AddressShip" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "district",
DROP COLUMN "state",
ADD COLUMN     "addressInstruction" TEXT,
ADD COLUMN     "cityId" INTEGER,
ADD COLUMN     "countryId" INTEGER NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "districtId" INTEGER,
ADD COLUMN     "geoinfo" JSONB,
ADD COLUMN     "houseNumber" TEXT,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "labelId" INTEGER,
ADD COLUMN     "latitude" DECIMAL(10,7),
ADD COLUMN     "longitude" DECIMAL(10,7),
ADD COLUMN     "stateId" INTEGER,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "town" TEXT,
ADD COLUMN     "wardId" INTEGER,
ADD COLUMN     "zipcode" TEXT;

-- CreateTable
CREATE TABLE "public"."Country" (
    "id" SERIAL NOT NULL,
    "iso2" TEXT NOT NULL,
    "iso3" TEXT,
    "name" TEXT NOT NULL,
    "phoneCode" TEXT,
    "addressFormat" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."State" (
    "id" SERIAL NOT NULL,
    "countryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."City" (
    "id" SERIAL NOT NULL,
    "stateId" INTEGER,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."District" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wards" (
    "id" SERIAL NOT NULL,
    "districtId" INTEGER,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AddressLabel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "userId" INTEGER,

    CONSTRAINT "AddressLabel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_iso2_key" ON "public"."Country"("iso2");

-- CreateIndex
CREATE INDEX "wards_districtId_idx" ON "public"."wards"("districtId");

-- CreateIndex
CREATE INDEX "AddressShip_countryId_idx" ON "public"."AddressShip"("countryId");

-- CreateIndex
CREATE INDEX "AddressShip_userId_isDefault_idx" ON "public"."AddressShip"("userId", "isDefault");

-- CreateIndex
CREATE INDEX "AddressShip_stateId_idx" ON "public"."AddressShip"("stateId");

-- CreateIndex
CREATE INDEX "AddressShip_cityId_idx" ON "public"."AddressShip"("cityId");

-- CreateIndex
CREATE INDEX "AddressShip_districtId_idx" ON "public"."AddressShip"("districtId");

-- CreateIndex
CREATE INDEX "AddressShip_wardId_idx" ON "public"."AddressShip"("wardId");

-- CreateIndex
CREATE INDEX "AddressShip_zipcode_idx" ON "public"."AddressShip"("zipcode");

-- CreateIndex
CREATE INDEX "AddressShip_status_idx" ON "public"."AddressShip"("status");

-- AddForeignKey
ALTER TABLE "public"."AddressShip" ADD CONSTRAINT "AddressShip_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AddressShip" ADD CONSTRAINT "AddressShip_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AddressShip" ADD CONSTRAINT "AddressShip_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "public"."City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AddressShip" ADD CONSTRAINT "AddressShip_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "public"."District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AddressShip" ADD CONSTRAINT "AddressShip_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "public"."wards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AddressShip" ADD CONSTRAINT "AddressShip_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "public"."AddressLabel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."State"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."District" ADD CONSTRAINT "District_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "public"."City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wards" ADD CONSTRAINT "wards_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "public"."District"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AddressLabel" ADD CONSTRAINT "AddressLabel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
