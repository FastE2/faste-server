-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Shop" ADD COLUMN     "addressWallet" TEXT DEFAULT '';
