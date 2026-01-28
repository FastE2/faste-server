"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryResSchema = exports.CreateCategoryResSchema = exports.GetCategoryResSchema = exports.GetCategoryByIdResSchema = exports.UpdateCategoryBodySchema = exports.CreateCategoryBodySchema = exports.CategorySchema = void 0;
const zod_1 = require("zod");
exports.CategorySchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(1).max(500),
    description: zod_1.z.string().default(''),
    image: zod_1.z.string().nullable(),
    parentCategoryId: zod_1.z.number().nullable(),
    createdById: zod_1.z.number().nullable(),
    updatedById: zod_1.z.number().nullable(),
    deletedById: zod_1.z.number().nullable(),
    deletedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date().nullable(),
});
exports.CreateCategoryBodySchema = exports.CategorySchema.pick({
    name: true,
    description: true,
    parentCategoryId: true,
}).strict();
exports.UpdateCategoryBodySchema = exports.CreateCategoryBodySchema;
exports.GetCategoryByIdResSchema = exports.CategorySchema;
exports.GetCategoryResSchema = zod_1.z.array(exports.CategorySchema);
exports.CreateCategoryResSchema = exports.CategorySchema;
exports.UpdateCategoryResSchema = exports.CategorySchema;
//# sourceMappingURL=category.schema.js.map