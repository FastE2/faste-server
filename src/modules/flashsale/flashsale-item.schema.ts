import { z } from 'zod';

export const createFlashSaleItemSchema = z.object({
  flashSaleId: z.number().int().positive(),
  skuId: z.number().int().positive(),
  flashPrice: z.number().positive('Giá flash sale phải > 0'),
  stock: z.number().int().nonnegative().default(0),
});

export const updateFlashSaleItemSchema = createFlashSaleItemSchema.partial();

export type CreateFlashSaleItemType = z.infer<typeof createFlashSaleItemSchema>;
export type UpdateFlashSaleItemType = z.infer<typeof updateFlashSaleItemSchema>;
