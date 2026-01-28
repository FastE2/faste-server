"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderIncludeProductSKUSnapshotSchema = exports.ProductSKUSnapshotSchema = exports.OrderSchema = exports.OrderStatusSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.OrderStatusSchema = zod_1.z.enum([
    client_1.OrderStatus.PENDING_CONFIRMATION,
    client_1.OrderStatus.PROCESSING,
    client_1.OrderStatus.PENDING_PAYMENT,
    client_1.OrderStatus.PENDING_PICKUP,
    client_1.OrderStatus.PENDING_DELIVERY,
    client_1.OrderStatus.DELIVERED,
    client_1.OrderStatus.RECEIVED,
    client_1.OrderStatus.RETURNED,
    client_1.OrderStatus.CANCELLED,
]);
exports.OrderSchema = zod_1.z.object({
    id: zod_1.z.number(),
    userId: zod_1.z.number(),
    status: exports.OrderStatusSchema,
    addressShipId: zod_1.z.number(),
    shopId: zod_1.z.number().nullable(),
    paymentId: zod_1.z.number().nullable(),
    createdById: zod_1.z.number().nullable(),
    updatedById: zod_1.z.number().nullable(),
    deletedById: zod_1.z.number().nullable(),
    deletedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.ProductSKUSnapshotSchema = zod_1.z.object({
    id: zod_1.z.number(),
    productId: zod_1.z.number().nullable(),
    productName: zod_1.z.string(),
    productTranslations: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.number(),
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        languageId: zod_1.z.string(),
    })),
    skuPrice: zod_1.z.number(),
    image: zod_1.z.string(),
    skuAttributes: zod_1.z.record(zod_1.z.string(), zod_1.z.string()),
    skuId: zod_1.z.number().nullable(),
    orderId: zod_1.z.number().nullable(),
    quantity: zod_1.z.number(),
    createdAt: zod_1.z.date(),
});
exports.OrderIncludeProductSKUSnapshotSchema = exports.OrderSchema.extend({
    items: zod_1.z.array(exports.ProductSKUSnapshotSchema),
});
//# sourceMappingURL=order.schema.js.map