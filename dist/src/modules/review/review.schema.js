"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReviewResSchema = exports.CreateReviewResSchema = exports.GetReviewResSchema = exports.GetReviewByIdResSchema = exports.UpdateReviewBodySchema = exports.CreateReviewBodySchema = exports.UpdateReviewReplyBodySchema = exports.CreateReviewReplyBodySchema = exports.ReviewQuerySchema = exports.ReviewReplySchema = exports.ReviewSchema = exports.ReviewBadReasonEnum = void 0;
const zod_1 = require("zod");
exports.ReviewBadReasonEnum = zod_1.z.enum([
    'DAMAGED_PRODUCT',
    'FAKE_PRODUCT',
    'NOT_AS_DESCRIBED',
    'POOR_QUALITY',
]);
exports.ReviewSchema = zod_1.z.object({
    id: zod_1.z.number(),
    orderItemId: zod_1.z.number(),
    userId: zod_1.z.number(),
    productId: zod_1.z.number(),
    skuId: zod_1.z.number().nullable(),
    sellerId: zod_1.z.number(),
    rating: zod_1.z.number().min(1).max(5),
    message: zod_1.z.string().nullable(),
    reason: exports.ReviewBadReasonEnum.nullable(),
    serviceSeller: zod_1.z.number().min(1).max(5),
    serviceShip: zod_1.z.number().min(1).max(5),
    images: zod_1.z.array(zod_1.z.string().max(500)).default([]),
    isAnonymous: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.ReviewReplySchema = zod_1.z.object({
    id: zod_1.z.number(),
    comment: zod_1.z
        .string()
        .trim()
        .min(1, 'Nội dung phản hồi không được để trống')
        .max(200, 'Nội dung phản hồi tối đa 200 ký tự'),
    sellerId: zod_1.z.number(),
    reviewId: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.ReviewQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
    orderItemId: zod_1.z.coerce.number().int().optional(),
    sellerId: zod_1.z.coerce.number().int().optional(),
    productId: zod_1.z.coerce.number().int().optional(),
    skuId: zod_1.z.coerce.number().int().optional(),
    userId: zod_1.z.coerce.number().int().optional(),
    rating: zod_1.z.coerce.number().int().min(1).max(5).optional(),
    sortBy: zod_1.z.enum(['createdAt', 'rating']).default('createdAt'),
    order: zod_1.z.enum(['asc', 'desc']).default('desc'),
    isReply: zod_1.z.boolean().optional(),
});
exports.CreateReviewReplyBodySchema = exports.ReviewReplySchema.pick({
    comment: true,
});
exports.UpdateReviewReplyBodySchema = exports.CreateReviewReplyBodySchema;
exports.CreateReviewBodySchema = exports.ReviewSchema.pick({
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
exports.UpdateReviewBodySchema = exports.CreateReviewBodySchema.omit({
    orderItemId: true,
    skuId: true,
    productId: true,
    userId: true,
    sellerId: true,
});
exports.GetReviewByIdResSchema = exports.ReviewSchema;
exports.GetReviewResSchema = zod_1.z.array(exports.ReviewSchema);
exports.CreateReviewResSchema = exports.ReviewSchema;
exports.UpdateReviewResSchema = exports.ReviewSchema;
//# sourceMappingURL=review.schema.js.map