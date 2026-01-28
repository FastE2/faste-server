"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skuIdParamSchema = exports.skuUpdateSchema = exports.UpsertSKUBodySchema = exports.SKUSchema = void 0;
const zod_1 = require("zod");
const idSchema = zod_1.z.coerce.number().int().positive();
const nonNegInt = zod_1.z.coerce.number().int().min(0);
const posInt = zod_1.z.coerce.number().int().positive();
const skuCodeSchema = zod_1.z
    .string()
    .min(1, 'skuCode không được rỗng')
    .max(191, 'skuCode quá dài')
    .regex(/^[A-Za-z0-9._-]+$/, 'skuCode chỉ gồm chữ, số, dấu . _ -');
const attributesSchema = zod_1.z
    .record(zod_1.z.string(), zod_1.z.string())
    .describe('{"color": "red", "size": "L"}');
const imageSchema = zod_1.z.string().default('');
exports.SKUSchema = zod_1.z.object({
    skuCode: skuCodeSchema,
    productId: idSchema,
    image: imageSchema,
    price: nonNegInt,
    attributes: attributesSchema,
    quantity: nonNegInt.optional().default(0),
    sold: nonNegInt.optional().default(0),
    weightGram: zod_1.z.coerce.number().int().min(0).optional(),
    lengthCm: zod_1.z.coerce.number().int().min(0).optional(),
    widthCm: zod_1.z.coerce.number().int().min(0).optional(),
    heightCm: zod_1.z.coerce.number().int().min(0).optional(),
    createdById: zod_1.z.number(),
    updatedById: zod_1.z.number().optional().nullable(),
    deletedById: zod_1.z.number().optional().nullable(),
    deletedAt: zod_1.z.string().datetime().optional().nullable(),
    createdAt: zod_1.z.string().datetime().optional(),
    updatedAt: zod_1.z.string().datetime().optional(),
});
exports.UpsertSKUBodySchema = zod_1.z.object({
    attributes: attributesSchema,
    image: imageSchema,
    price: nonNegInt,
    quantity: nonNegInt.optional().default(0),
    weightGram: zod_1.z.coerce.number().int().min(0).optional(),
    lengthCm: zod_1.z.coerce.number().int().min(0).optional(),
    widthCm: zod_1.z.coerce.number().int().min(0).optional(),
    heightCm: zod_1.z.coerce.number().int().min(0).optional(),
});
exports.skuUpdateSchema = zod_1.z
    .object({
    skuCode: skuCodeSchema.optional(),
    image: imageSchema.optional(),
    price: nonNegInt.optional(),
    attributes: attributesSchema.optional(),
    quantity: nonNegInt.optional(),
    sold: nonNegInt.optional(),
    weightGram: zod_1.z.coerce.number().int().min(0).optional().nullable(),
    lengthCm: zod_1.z.coerce.number().int().min(0).optional().nullable(),
    widthCm: zod_1.z.coerce.number().int().min(0).optional().nullable(),
    heightCm: zod_1.z.coerce.number().int().min(0).optional().nullable(),
    updatedById: idSchema.optional(),
    deletedAt: zod_1.z.coerce.date().optional().nullable(),
    deletedById: idSchema.optional().nullable(),
})
    .refine((data) => Object.keys(data).length > 0, 'Payload update không được rỗng');
exports.skuIdParamSchema = zod_1.z.object({
    id: idSchema,
});
//# sourceMappingURL=sku.schema.js.map