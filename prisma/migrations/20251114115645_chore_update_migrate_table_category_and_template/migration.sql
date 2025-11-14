-- AlterTable
ALTER TABLE "public"."Category" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Template" ALTER COLUMN "name" DROP DEFAULT;
