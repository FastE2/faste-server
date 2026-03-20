"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOrderResSchema = exports.UpdateOrderStatusBodySchema = exports.GetOrderDetailResSchema = exports.GetOrderListQuerySchema = exports.GetOrderListResSchema = exports.UpdateOrderBodySchema = exports.CreateOrderBodySchema = void 0;
const client_1 = require("@prisma/client");
const order_schema_1 = require("../../common/schemas/order.schema");
const request_schema_1 = require("../../common/schemas/request.schema");
const zod_1 = require("zod");
exports.CreateOrderBodySchema = zod_1.z
    .array(zod_1.z.object({
    shopId: zod_1.z.number(),
    paymentMethod: zod_1.z.nativeEnum(client_1.PaymentMethod),
    addressShipId: zod_1.z.number(),
    deliveryId: zod_1.z.number(),
    cartItemIds: zod_1.z.array(zod_1.z.number()).min(1),
}))
    .min(1);
exports.UpdateOrderBodySchema = order_schema_1.OrderSchema.pick({
    addressShipId: true,
    status: true,
}).partial();
exports.GetOrderListResSchema = zod_1.z.object({
    data: zod_1.z.array(order_schema_1.OrderSchema.extend({
        items: zod_1.z.array(order_schema_1.ProductSKUSnapshotSchema),
    }).omit({
        addressShipId: true,
        deletedAt: true,
        deletedById: true,
        createdById: true,
        updatedById: true,
    })),
    totalItems: zod_1.z.number(),
    page: zod_1.z.number(),
    limit: zod_1.z.number(),
    totalPages: zod_1.z.number(),
});
exports.GetOrderListQuerySchema = request_schema_1.PaginationQuerySchema.extend({
    keyword: zod_1.z.string(),
    status: order_schema_1.OrderStatusSchema.optional(),
});
exports.GetOrderDetailResSchema = order_schema_1.OrderSchema.extend({
    items: zod_1.z.array(order_schema_1.ProductSKUSnapshotSchema),
});
exports.UpdateOrderStatusBodySchema = order_schema_1.OrderSchema.pick({
    status: true,
});
exports.CancelOrderResSchema = order_schema_1.OrderSchema;
//# sourceMappingURL=order.schema.js.map