-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "image" VARCHAR(250) NOT NULL DEFAULT 'ds';

-- AlterTable
ALTER TABLE "public"."Template" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'template',
ALTER COLUMN "WidgetIds" DROP DEFAULT,
ALTER COLUMN "categoriesView" DROP DEFAULT;
