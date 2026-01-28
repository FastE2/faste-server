"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLanguageBodySchema = exports.CreateLanguageBodySchema = exports.LanguageSchema = void 0;
const zod_1 = require("zod");
exports.LanguageSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(1).max(200),
    createdById: zod_1.z.number().nullable(),
    updatedById: zod_1.z.number().nullable(),
    deletedById: zod_1.z.number().nullable(),
    deletedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.CreateLanguageBodySchema = exports.LanguageSchema.pick({
    name: true,
});
exports.UpdateLanguageBodySchema = exports.CreateLanguageBodySchema;
//# sourceMappingURL=language.schema.js.map