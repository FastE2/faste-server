"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFlashSaleItemBodySchema = exports.GetParamsFlashSaleSchema = exports.CreateFlashSaleItemBodySchema = exports.FlashSaleItemSchema = void 0;
const zod_1 = require("zod");
exports.FlashSaleItemSchema = zod_1.z.object({
    flashSaleId: zod_1.z.number().int().positive(),
    skuId: zod_1.z.number().int().positive(),
    flashPrice: zod_1.z.number().positive('Giá flash sale phải > 0'),
    stock: zod_1.z.number().int().nonnegative().default(0),
    sold: zod_1.z.number().int().nonnegative().default(0),
    createdById: zod_1.z.number(),
    updatedById: zod_1.z.number().nullable(),
    deletedById: zod_1.z.number().nullable(),
    deletedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.CreateFlashSaleItemBodySchema = exports.FlashSaleItemSchema.pick({
    skuId: true,
    flashPrice: true,
    stock: true,
});
exports.GetParamsFlashSaleSchema = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    itemId: zod_1.z.coerce.number(),
});
exports.UpdateFlashSaleItemBodySchema = exports.CreateFlashSaleItemBodySchema.partial();
//# sourceMappingURL=flashsale-item.schema.js.map