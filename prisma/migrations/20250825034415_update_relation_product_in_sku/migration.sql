-- DropForeignKey
ALTER TABLE "public"."SKU" DROP CONSTRAINT "SKU_productId_fkey";

-- CreateIndex
CREATE INDEX "SKU_productId_idx" ON "public"."SKU"("productId");

-- AddForeignKey
ALTER TABLE "public"."SKU" ADD CONSTRAINT "SKU_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
