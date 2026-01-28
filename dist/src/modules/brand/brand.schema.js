"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBrandResSchema = exports.CreateBrandResSchema = exports.GetBrandResSchema = exports.GetBrandByIdResSchema = exports.UpdateBrandBodySchema = exports.CreateBrandBodySchema = exports.BrandSchema = void 0;
const zod_1 = require("zod");
exports.BrandSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(1).max(500),
    description: zod_1.z.string().default(''),
    logo: zod_1.z.string().max(300),
    createdById: zod_1.z.number().nullable(),
    updatedById: zod_1.z.number().nullable(),
    deletedById: zod_1.z.number().nullable(),
    deletedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.CreateBrandBodySchema = exports.BrandSchema.pick({
    name: true,
    description: true,
    logo: true,
}).strict();
exports.UpdateBrandBodySchema = exports.CreateBrandBodySchema;
exports.GetBrandByIdResSchema = exports.BrandSchema;
exports.GetBrandResSchema = zod_1.z.array(exports.BrandSchema);
exports.CreateBrandResSchema = exports.BrandSchema;
exports.UpdateBrandResSchema = exports.BrandSchema;
//# sourceMappingURL=brand.schema.js.map