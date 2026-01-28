"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const zod_1 = require("zod");
exports.CategorySchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(1).max(500),
    description: zod_1.z.string().default(''),
    parentCategoryId: zod_1.z.number().nullable(),
    createdById: zod_1.z.number().nullable(),
    updatedById: zod_1.z.number().nullable(),
    deletedById: zod_1.z.number().nullable(),
    deletedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date().nullable(),
});
//# sourceMappingURL=category.schema.js.map