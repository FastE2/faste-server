import { z } from 'zod';

export const FlashSaleItemSchema = z.object({
  flashSaleId: z.number().int().positive(),
  skuId: z.number().int().positive(),
  flashPrice: z.number().positive('Giá flash sale phải > 0'),
  stock: z.number().int().nonnegative().default(0),
  sold: z.number().int().nonnegative().default(0),

  createdById: z.number(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateFlashSaleItemBodySchema = FlashSaleItemSchema.pick({
  skuId: true,
  flashPrice: true,
  stock: true,
});

export const GetParamsFlashSaleSchema = z.object({
  id: z.coerce.number(),
  itemId: z.coerce.number(),
});

export const UpdateFlashSaleItemBodySchema =
  CreateFlashSaleItemBodySchema.partial();

export type CreateFlashSaleItemBodyType = z.infer<
  typeof CreateFlashSaleItemBodySchema
>;
export type UpdateFlashSaleItemBodyType = z.infer<
  typeof UpdateFlashSaleItemBodySchema
>;
