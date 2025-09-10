/*
  Warnings:

  - The values [COUNTRY] on the enum `DivisionLevel` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[parentId,code]` on the table `AdministrativeDivision` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DivisionLevel_new" AS ENUM ('STATE', 'CITY', 'DISTRICT', 'WARD');
ALTER TABLE "public"."AdministrativeDivision" ALTER COLUMN "level" TYPE "public"."DivisionLevel_new" USING ("level"::text::"public"."DivisionLevel_new");
ALTER TYPE "public"."DivisionLevel" RENAME TO "DivisionLevel_old";
ALTER TYPE "public"."DivisionLevel_new" RENAME TO "DivisionLevel";
DROP TYPE "public"."DivisionLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."AdministrativeDivision" ADD COLUMN     "countryId" INTEGER;

-- CreateIndex
CREATE INDEX "AdministrativeDivision_parentId_level_idx" ON "public"."AdministrativeDivision"("parentId", "level");

-- CreateIndex
CREATE INDEX "AdministrativeDivision_countryId_idx" ON "public"."AdministrativeDivision"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "AdministrativeDivision_parentId_code_key" ON "public"."AdministrativeDivision"("parentId", "code");

-- AddForeignKey
ALTER TABLE "public"."AdministrativeDivision" ADD CONSTRAINT "AdministrativeDivision_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
