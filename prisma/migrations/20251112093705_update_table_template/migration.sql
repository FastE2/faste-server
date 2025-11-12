-- AlterTable
ALTER TABLE "public"."Template" ADD COLUMN     "theme" TEXT;

-- AlterTable
ALTER TABLE "public"."Widget" ALTER COLUMN "viewConfig" DROP NOT NULL;
