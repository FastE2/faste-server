import { PaymentMethod } from '@prisma/client';
import {
  OrderSchema,
  OrderStatusSchema,
  ProductSKUSnapshotSchema,
} from 'src/common/schemas/order.schema';
import { PaginationQuerySchema } from 'src/common/schemas/request.schema';
import { z } from 'zod';

export const CreateOrderBodySchema = z
  .array(
    z.object({
      shopId: z.number(),
      paymentMethod: z.nativeEnum(PaymentMethod),
      addressShipId: z.number(),
      deliveryId: z.number(),
      cartItemIds: z.array(z.number()).min(1),
    }),
  )
  .min(1);

export const UpdateOrderBodySchema = OrderSchema.pick({
  addressShipId: true,
  status: true,
}).partial();

export const GetOrderListResSchema = z.object({
  data: z.array(
    OrderSchema.extend({
      items: z.array(ProductSKUSnapshotSchema),
    }).omit({
      addressShipId: true,
      deletedAt: true,
      deletedById: true,
      createdById: true,
      updatedById: true,
    }),
  ),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetOrderListQuerySchema = PaginationQuerySchema.extend({
  keyword: z.string(),
  status: OrderStatusSchema.optional(),
});

export const GetOrderDetailResSchema = OrderSchema.extend({
  items: z.array(ProductSKUSnapshotSchema),
});
export const UpdateOrderStatusBodySchema = OrderSchema.pick({
  status: true,
});
export const CancelOrderResSchema = OrderSchema;

export type GetOrderListResType = z.infer<typeof GetOrderListResSchema>;
export type GetOrderListQueryType = z.infer<typeof GetOrderListQuerySchema>;
export type GetOrderDetailResType = z.infer<typeof GetOrderDetailResSchema>;
export type CreateOrderBodyType = z.infer<typeof CreateOrderBodySchema>;
export type CancelOrderResType = z.infer<typeof CancelOrderResSchema>;
export type UpdateOrderStatusBodyType = z.infer<
  typeof UpdateOrderStatusBodySchema
>;

export type UpdateOrderBodyType = z.infer<typeof UpdateOrderBodySchema>;
