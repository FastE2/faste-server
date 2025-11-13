-- AlterTable
ALTER TABLE "public"."Template" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public."Template"
ADD COLUMN IF NOT EXISTS "categoriesView" integer[];
