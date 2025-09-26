/*
  Warnings:

  - A unique constraint covering the columns `[flashsale_id,sku_id]` on the table `FlashSaleItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable

-- CreateIndex
CREATE UNIQUE INDEX "FlashSaleItem_flashsale_id_sku_id_key" ON "public"."FlashSaleItem"("flashsale_id", "sku_id");

-- 1. Thêm cột shopId (nullable trước)
ALTER TABLE "Product"
ADD COLUMN "shopId" INT;

-- 2. Gán dữ liệu: vì user.id = shop.id, chỉ cần copy thẳng
UPDATE "Product"
SET "shopId" = "createdById";

-- 3. Xóa FK cũ của createdById
ALTER TABLE "Product" DROP CONSTRAINT IF EXISTS "Product_createdById_fkey";

-- 4. Xóa cột createdById
ALTER TABLE "Product" DROP COLUMN IF EXISTS "createdById";

-- 5. Đặt shopId NOT NULL (nếu muốn tất cả Product phải có shop)
ALTER TABLE "Product"
ALTER COLUMN "shopId" SET NOT NULL;

-- 6. Thêm FK mới cho shopId → Shop(id)
ALTER TABLE "Product"
ADD CONSTRAINT "Product_shopId_fkey"
FOREIGN KEY ("shopId") REFERENCES "Shop"("shopid")
ON DELETE CASCADE ON UPDATE NO ACTION;

