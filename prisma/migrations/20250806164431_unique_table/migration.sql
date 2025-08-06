/*
  Warnings:

  - You are about to drop the column `LanguageId` on the `ProductTranslation` table. All the data in the column will be lost.
  - Added the required column `languageId` to the `ProductTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ProductTranslation" DROP CONSTRAINT "ProductTranslation_LanguageId_fkey";

-- AlterTable
ALTER TABLE "public"."ProductTranslation" DROP COLUMN "LanguageId",
ADD COLUMN     "languageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ProductTranslation" ADD CONSTRAINT "ProductTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Unique
CREATE UNIQUE INDEX unique_email_deletedAt_null ON "User" (email) WHERE "deletedAt" IS NULL;
CREATE UNIQUE INDEX unique_name_deletedAt_null ON "Role" (name) WHERE "deletedAt" IS NULL;
CREATE UNIQUE INDEX unique_path_method_deletedAt_null ON "Permission" (path, method) WHERE "deletedAt" IS NULL;
CREATE UNIQUE INDEX unique_slugId_deletedAt_null ON "Product" ("slugId") WHERE "deletedAt" IS NULL;
CREATE UNIQUE INDEX unique_categoryId_languageId_deletedAt_null ON "CategoryTranslation" ("categoryId", "languageId") WHERE "deletedAt" IS NULL;
CREATE UNIQUE INDEX unique_brandId_languageId_deletedAt_null ON "BrandTranslation" ("brandId", "languageId") WHERE "deletedAt" IS NULL;
CREATE UNIQUE INDEX unique_productId_languageId_deletedAt_null ON "ProductTranslation" ("productId", "languageId") WHERE "deletedAt" IS NULL;