"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSearchSchema = exports.SkuSchema = void 0;
const zod_1 = require("zod");
exports.SkuSchema = zod_1.z.object({
    attributeName: zod_1.z.string().min(1),
    attributeValue: zod_1.z.string().min(1),
    price: zod_1.z.number().nonnegative(),
});
exports.CreateProductSearchSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    images: zod_1.z.array(zod_1.z.string().url()).nonempty(),
    brandId: zod_1.z.number().int(),
    name: zod_1.z.string().min(1),
    name_suggest: zod_1.z.string().min(1),
    slugId: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    createdAt: zod_1.z.string().optional(),
    rating: zod_1.z.number().min(0).default(0),
    ratingCount: zod_1.z.number().min(0).default(0),
    categories: zod_1.z.array(zod_1.z.number().int()).nonempty(),
    totalViews: zod_1.z.number().min(0).default(0),
    viewsToday: zod_1.z.number().min(0).default(0),
    salesToday: zod_1.z.number().min(0).default(0),
    status: zod_1.z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
    skus: zod_1.z.array(exports.SkuSchema).nonempty(),
});
//# sourceMappingURL=search.schema.js.map