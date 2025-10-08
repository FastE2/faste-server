-- CreateEnum
CREATE TYPE "public"."WidgetType" AS ENUM ('TITLE', 'BANNER_CAROUSEL', 'BANNER_GRID4', 'CATEGORIES_GRID', 'CATEGORIES_CAROUSEL', 'PRODUCTS_ALL', 'PRODUCTS_RATING', 'PRODUCTS_GRID', 'STORIES_CAROUSEL', 'FLASH_SALE', 'DISCOUNT', 'COLLECTIONS_CAROUSEL', 'COLLECTIONS_VERTICAL');

-- CreateEnum
CREATE TYPE "public"."platformType" AS ENUM ('MOBILE', 'DESKTOP');

-- CreateTable
CREATE TABLE "public"."Widget" (
    "id" SERIAL NOT NULL,
    "templateId" INTEGER NOT NULL,
    "refViewId" INTEGER NOT NULL,
    "name" TEXT,
    "type" "public"."WidgetType" NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "widgetIndex" INTEGER NOT NULL,
    "viewConfig" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Widget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Template" (
    "id" SERIAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "platform" "public"."platformType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Widget" ADD CONSTRAINT "Widget_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Template" ADD CONSTRAINT "Template_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Shop"("shopid") ON DELETE RESTRICT ON UPDATE CASCADE;
