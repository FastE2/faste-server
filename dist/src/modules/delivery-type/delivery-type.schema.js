"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeliveryTypeResSchema = exports.CreateDeliveryTypeResSchema = exports.GetDeliveryTypeResSchema = exports.GetDeliveryTypeByIdResSchema = exports.UpdateDeliveryTypeBodySchema = exports.CreateDeliveryTypeBodySchema = exports.DeliveryTypeSchema = void 0;
const zod_1 = require("zod");
exports.DeliveryTypeSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(1).max(500),
    code: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().default(''),
    estimatedTime: zod_1.z.string().min(1).max(500).optional().nullable(),
    countryCode: zod_1.z.string().min(1).max(100),
    basePrice: zod_1.z.number().min(0),
    pricePerKg: zod_1.z.number().min(0),
    isActive: zod_1.z.boolean().default(true),
    createdById: zod_1.z.number().nullable(),
    updatedById: zod_1.z.number().nullable(),
    deletedById: zod_1.z.number().nullable(),
    deletedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.CreateDeliveryTypeBodySchema = exports.DeliveryTypeSchema.pick({
    name: true,
    code: true,
    description: true,
    basePrice: true,
    estimatedTime: true,
    countryCode: true,
    pricePerKg: true,
    isActive: true,
}).strict();
exports.UpdateDeliveryTypeBodySchema = exports.CreateDeliveryTypeBodySchema;
exports.GetDeliveryTypeByIdResSchema = exports.DeliveryTypeSchema;
exports.GetDeliveryTypeResSchema = zod_1.z.array(exports.DeliveryTypeSchema);
exports.CreateDeliveryTypeResSchema = exports.DeliveryTypeSchema;
exports.UpdateDeliveryTypeResSchema = exports.DeliveryTypeSchema;
//# sourceMappingURL=delivery-type.schema.js.map