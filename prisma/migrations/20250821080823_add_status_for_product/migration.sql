-- CreateEnum
CREATE TYPE "public"."ProductStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "status" "public"."ProductStatus" NOT NULL DEFAULT 'DRAFT';
