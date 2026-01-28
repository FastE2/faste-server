import { z } from 'zod';

export const ReviewBadReasonEnum = z.enum([
  'DAMAGED_PRODUCT',
  'FAKE_PRODUCT',
  'NOT_AS_DESCRIBED',
  'POOR_QUALITY',
]);

export const ReviewSchema = z.object({
  id: z.number(),

  orderItemId: z.number(),
  userId: z.number(),
  productId: z.number(),
  skuId: z.number().nullable(),
  sellerId: z.number(),

  rating: z.number().min(1).max(5),
  message: z.string().nullable(),

  reason: ReviewBadReasonEnum.nullable(),

  serviceSeller: z.number().min(1).max(5),
  serviceShip: z.number().min(1).max(5),

  images: z.array(z.string().max(500)).default([]),

  isAnonymous: z.boolean(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ReviewReplySchema = z.object({
  id: z.number(),
  comment: z
    .string()
    .trim()
    .min(1, 'Nội dung phản hồi không được để trống')
    .max(200, 'Nội dung phản hồi tối đa 200 ký tự'),
  sellerId: z.number(),
  reviewId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ReviewQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  // filters
  orderItemId: z.coerce.number().int().optional(),
  sellerId: z.coerce.number().int().optional(),
  productId: z.coerce.number().int().optional(),
  skuId: z.coerce.number().int().optional(),
  userId: z.coerce.number().int().optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),

  // sort
  sortBy: z.enum(['createdAt', 'rating']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  isReply: z.boolean().optional(),
});

export const CreateReviewReplyBodySchema = ReviewReplySchema.pick({
  comment: true,
});

export const UpdateReviewReplyBodySchema = CreateReviewReplyBodySchema;

export const CreateReviewBodySchema = ReviewSchema.pick({
  orderItemId: true,
  productId: true,
  skuId: true,
  sellerId: true,
  images: true,
  rating: true,
  message: true,
  isAnonymous: true,
  reason: true,
  serviceSeller: true,
  serviceShip: true,
}).strict();

export const UpdateReviewBodySchema = CreateReviewBodySchema.omit({
  orderItemId: true,
  skuId: true,
  productId: true,
  userId: true,
  sellerId: true,
});

export const GetReviewByIdResSchema = ReviewSchema;
export const GetReviewResSchema = z.array(ReviewSchema);
export const CreateReviewResSchema = ReviewSchema;
export const UpdateReviewResSchema = ReviewSchema;

export type ReviewType = z.infer<typeof ReviewSchema>;
export type CreateReviewBodyType = z.infer<typeof CreateReviewBodySchema>;
export type UpdateReviewBodyType = z.infer<typeof UpdateReviewBodySchema>;
export type ReviewQueryType = z.infer<typeof ReviewQuerySchema>;

export type UpdateReviewReplyBodyType = z.infer<
  typeof UpdateReviewReplyBodySchema
>;
export type CreateReviewReplyBodyType = z.infer<
  typeof CreateReviewReplyBodySchema
>;
