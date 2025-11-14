-- AlterTable
ALTER TABLE "public"."Template" ADD COLUMN     "WidgetIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "categoriesView" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ALTER COLUMN "platform" SET DEFAULT 'DESKTOP';
