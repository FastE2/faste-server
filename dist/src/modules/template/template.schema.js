"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTemplateBodySchema = exports.CreateTemplateBodySchema = exports.TemplateSchema = void 0;
const zod_1 = require("zod");
exports.TemplateSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(1).max(200),
    categoriesView: zod_1.z.array(zod_1.z.number()).max(8),
    WidgetIds: zod_1.z.array(zod_1.z.number()).max(10),
    sellerId: zod_1.z.number(),
    theme: zod_1.z.string().min(1).max(100).nullable(),
    isActive: zod_1.z.boolean().default(false),
    createdAt: zod_1.z.date(),
});
exports.CreateTemplateBodySchema = exports.TemplateSchema.pick({
    name: true,
    WidgetIds: true,
    categoriesView: true,
    isActive: true,
    theme: true,
}).strict();
exports.UpdateTemplateBodySchema = exports.CreateTemplateBodySchema;
//# sourceMappingURL=template.schema.js.map