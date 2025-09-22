import { PaginationQuerySchema } from 'src/common/schemas/request.schema';
import { z } from 'zod';

export const FlashSaleStatusEnum = z.enum([
  'DRAFT',
  'SCHEDULED',
  'LIVE',
  'ENDED',
  'CANCELLED',
]);

export const FlashSaleTypeEnum = z.enum(['SELLER', 'PLATFORM']);

export const FlashSaleSchema = z.object({
  name: z.string().min(1, 'name flash sale is required'),
  description: z.string(),
  image: z.string().url('Ảnh phải là URL hợp lệ'),
  status: FlashSaleStatusEnum.optional(),
  type: FlashSaleTypeEnum.optional(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),

  createdById: z.number(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateFlashSaleBodySchema = FlashSaleSchema.pick({
  name: true,
  description: true,
  image: true,
  type: true,
  startAt: true,
  endAt: true,
}).extend({
  isDraft: z.boolean().default(false),
});

export const UpdateFlashSaleBodySchema = CreateFlashSaleBodySchema.partial();
export const UpdateFlashSaleStatusBodySchema = z.object({
  status: z.enum(['DRAFT', 'SCHEDULED', 'CANCELLED']),
});

export const FlashSaleListQuerySchema = PaginationQuerySchema.pick({
  limit: true,
  page: true,
}).extend({
  type: z.string().optional(),
  status: z.string().optional(),
  createdById: z.coerce.number().optional(),
});

export type FlashSaleListQueryType = z.infer<typeof FlashSaleListQuerySchema>;
export type FlashSaleType = z.infer<typeof FlashSaleSchema>;
export type CreateFlashSaleBodyType = z.infer<typeof CreateFlashSaleBodySchema>;
export type UpdateFlashSaleBodyType = z.infer<typeof UpdateFlashSaleBodySchema>;
export type UpdateFlashSaleStatusBodyType = z.infer<
  typeof UpdateFlashSaleStatusBodySchema
>;
