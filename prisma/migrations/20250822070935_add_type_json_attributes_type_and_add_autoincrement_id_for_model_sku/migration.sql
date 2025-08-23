-- AlterTable
CREATE SEQUENCE "public".sku_id_seq;
ALTER TABLE "public"."SKU" ALTER COLUMN "id" SET DEFAULT nextval('"public".sku_id_seq');
ALTER SEQUENCE "public".sku_id_seq OWNED BY "public"."SKU"."id";
