"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManyWidgetsSchema = exports.UpdateWidgetBodySchema = exports.CreateWidgetBodySchema = exports.WidgetSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.WidgetSchema = zod_1.z.object({
    id: zod_1.z.number(),
    templateId: zod_1.z.number(),
    refViewId: zod_1.z.number(),
    name: zod_1.z.string().nullable().optional(),
    type: zod_1.z.nativeEnum(client_1.WidgetType),
    isVisible: zod_1.z.boolean().default(true),
    widgetIndex: zod_1.z.number(),
    viewConfig: zod_1.z.any().nullable().optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.CreateWidgetBodySchema = exports.WidgetSchema.pick({
    templateId: true,
    refViewId: true,
    name: true,
    type: true,
    isVisible: true,
    widgetIndex: true,
    viewConfig: true,
}).strict();
exports.UpdateWidgetBodySchema = exports.CreateWidgetBodySchema.partial();
exports.UpdateManyWidgetsSchema = zod_1.z
    .object({
    widgets: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.number(),
        widgetIndex: zod_1.z.number().optional(),
        name: zod_1.z.string().nullable().optional(),
        type: zod_1.z.nativeEnum(client_1.WidgetType),
        isVisible: zod_1.z.boolean().optional(),
        viewConfig: zod_1.z.any().optional(),
    })),
})
    .strict();
//# sourceMappingURL=widget.schema.js.map