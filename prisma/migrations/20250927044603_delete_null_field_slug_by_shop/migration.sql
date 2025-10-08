/*
  Warnings:

  - Made the column `slug` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Shop" ALTER COLUMN "slug" SET NOT NULL;
