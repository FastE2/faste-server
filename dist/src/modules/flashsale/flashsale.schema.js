"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashSaleListQuerySchema = exports.UpdateFlashSaleStatusBodySchema = exports.UpdateFlashSaleBodySchema = exports.CreateFlashSaleBodySchema = exports.FlashSaleSchema = exports.FlashSaleTypeEnum = exports.FlashSaleStatusEnum = void 0;
const request_schema_1 = require("../../common/schemas/request.schema");
const zod_1 = require("zod");
exports.FlashSaleStatusEnum = zod_1.z.enum([
    'DRAFT',
    'SCHEDULED',
    'LIVE',
    'ENDED',
    'CANCELLED',
]);
exports.FlashSaleTypeEnum = zod_1.z.enum(['SELLER', 'PLATFORM']);
exports.FlashSaleSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'name flash sale is required'),
    description: zod_1.z.string(),
    image: zod_1.z.string().url('Ảnh phải là URL hợp lệ'),
    status: exports.FlashSaleStatusEnum.optional(),
    type: exports.FlashSaleTypeEnum.optional(),
    startAt: zod_1.z.coerce.date(),
    endAt: zod_1.z.coerce.date(),
    createdById: zod_1.z.number(),
    updatedById: zod_1.z.number().nullable(),
    deletedById: zod_1.z.number().nullable(),
    deletedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.CreateFlashSaleBodySchema = exports.FlashSaleSchema.pick({
    name: true,
    description: true,
    image: true,
    type: true,
    startAt: true,
    endAt: true,
}).extend({
    isDraft: zod_1.z.boolean().default(false),
});
exports.UpdateFlashSaleBodySchema = exports.CreateFlashSaleBodySchema.partial();
exports.UpdateFlashSaleStatusBodySchema = zod_1.z.object({
    status: zod_1.z.enum(['DRAFT', 'SCHEDULED', 'CANCELLED']),
});
exports.FlashSaleListQuerySchema = request_schema_1.PaginationQuerySchema.pick({
    limit: true,
    page: true,
}).extend({
    type: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    createdById: zod_1.z.coerce.number().optional(),
});
//# sourceMappingURL=flashsale.schema.js.map