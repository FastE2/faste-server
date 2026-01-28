declare const CreateReviewBodyDTO_base: import("nestjs-zod").ZodDto<{
    message: string | null;
    productId: number;
    images: string[];
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    orderItemId: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    productId: import("zod").ZodNumber;
    skuId: import("zod").ZodNullable<import("zod").ZodNumber>;
    sellerId: import("zod").ZodNumber;
    rating: import("zod").ZodNumber;
    message: import("zod").ZodNullable<import("zod").ZodString>;
    reason: import("zod").ZodNullable<import("zod").ZodEnum<["DAMAGED_PRODUCT", "FAKE_PRODUCT", "NOT_AS_DESCRIBED", "POOR_QUALITY"]>>;
    serviceSeller: import("zod").ZodNumber;
    serviceShip: import("zod").ZodNumber;
    images: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
    isAnonymous: import("zod").ZodBoolean;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "message" | "productId" | "images" | "rating" | "skuId" | "sellerId" | "orderItemId" | "reason" | "serviceSeller" | "serviceShip" | "isAnonymous">, "strict", import("zod").ZodTypeAny>, {
    message: string | null;
    productId: number;
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
    images?: string[] | undefined;
}>;
export declare class CreateReviewBodyDTO extends CreateReviewBodyDTO_base {
}
declare const UpdateReviewBodyDTO_base: import("nestjs-zod").ZodDto<{
    message: string | null;
    images: string[];
    rating: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
}, import("zod").ZodObjectDef<Omit<Pick<{
    id: import("zod").ZodNumber;
    orderItemId: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    productId: import("zod").ZodNumber;
    skuId: import("zod").ZodNullable<import("zod").ZodNumber>;
    sellerId: import("zod").ZodNumber;
    rating: import("zod").ZodNumber;
    message: import("zod").ZodNullable<import("zod").ZodString>;
    reason: import("zod").ZodNullable<import("zod").ZodEnum<["DAMAGED_PRODUCT", "FAKE_PRODUCT", "NOT_AS_DESCRIBED", "POOR_QUALITY"]>>;
    serviceSeller: import("zod").ZodNumber;
    serviceShip: import("zod").ZodNumber;
    images: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
    isAnonymous: import("zod").ZodBoolean;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "message" | "productId" | "images" | "rating" | "skuId" | "sellerId" | "orderItemId" | "reason" | "serviceSeller" | "serviceShip" | "isAnonymous">, "userId" | "productId" | "skuId" | "sellerId" | "orderItemId">, "strict", import("zod").ZodTypeAny>, {
    message: string | null;
    rating: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
    images?: string[] | undefined;
}>;
export declare class UpdateReviewBodyDTO extends UpdateReviewBodyDTO_base {
}
declare const GetReviewResDTO_base: import("nestjs-zod").ZodDto<{
    message: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    images: string[];
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
}[], import("zod").ZodArrayDef<import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    orderItemId: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    productId: import("zod").ZodNumber;
    skuId: import("zod").ZodNullable<import("zod").ZodNumber>;
    sellerId: import("zod").ZodNumber;
    rating: import("zod").ZodNumber;
    message: import("zod").ZodNullable<import("zod").ZodString>;
    reason: import("zod").ZodNullable<import("zod").ZodEnum<["DAMAGED_PRODUCT", "FAKE_PRODUCT", "NOT_AS_DESCRIBED", "POOR_QUALITY"]>>;
    serviceSeller: import("zod").ZodNumber;
    serviceShip: import("zod").ZodNumber;
    images: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
    isAnonymous: import("zod").ZodBoolean;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny, {
    message: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    images: string[];
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
}, {
    message: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
    images?: string[] | undefined;
}>>, {
    message: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
    images?: string[] | undefined;
}[]>;
export declare class GetReviewResDTO extends GetReviewResDTO_base {
}
declare const GetReviewByIdResDTO_base: import("nestjs-zod").ZodDto<{
    message: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    images: string[];
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    orderItemId: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    productId: import("zod").ZodNumber;
    skuId: import("zod").ZodNullable<import("zod").ZodNumber>;
    sellerId: import("zod").ZodNumber;
    rating: import("zod").ZodNumber;
    message: import("zod").ZodNullable<import("zod").ZodString>;
    reason: import("zod").ZodNullable<import("zod").ZodEnum<["DAMAGED_PRODUCT", "FAKE_PRODUCT", "NOT_AS_DESCRIBED", "POOR_QUALITY"]>>;
    serviceSeller: import("zod").ZodNumber;
    serviceShip: import("zod").ZodNumber;
    images: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
    isAnonymous: import("zod").ZodBoolean;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny>, {
    message: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
    images?: string[] | undefined;
}>;
export declare class GetReviewByIdResDTO extends GetReviewByIdResDTO_base {
}
declare const CreateReviewResDTO_base: import("nestjs-zod").ZodDto<{
    message: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    images: string[];
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    orderItemId: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    productId: import("zod").ZodNumber;
    skuId: import("zod").ZodNullable<import("zod").ZodNumber>;
    sellerId: import("zod").ZodNumber;
    rating: import("zod").ZodNumber;
    message: import("zod").ZodNullable<import("zod").ZodString>;
    reason: import("zod").ZodNullable<import("zod").ZodEnum<["DAMAGED_PRODUCT", "FAKE_PRODUCT", "NOT_AS_DESCRIBED", "POOR_QUALITY"]>>;
    serviceSeller: import("zod").ZodNumber;
    serviceShip: import("zod").ZodNumber;
    images: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
    isAnonymous: import("zod").ZodBoolean;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny>, {
    message: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
    images?: string[] | undefined;
}>;
export declare class CreateReviewResDTO extends CreateReviewResDTO_base {
}
declare const UpdateReviewResDTO_base: import("nestjs-zod").ZodDto<{
    message: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    images: string[];
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    orderItemId: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    productId: import("zod").ZodNumber;
    skuId: import("zod").ZodNullable<import("zod").ZodNumber>;
    sellerId: import("zod").ZodNumber;
    rating: import("zod").ZodNumber;
    message: import("zod").ZodNullable<import("zod").ZodString>;
    reason: import("zod").ZodNullable<import("zod").ZodEnum<["DAMAGED_PRODUCT", "FAKE_PRODUCT", "NOT_AS_DESCRIBED", "POOR_QUALITY"]>>;
    serviceSeller: import("zod").ZodNumber;
    serviceShip: import("zod").ZodNumber;
    images: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
    isAnonymous: import("zod").ZodBoolean;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny>, {
    message: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    rating: number;
    skuId: number | null;
    sellerId: number;
    orderItemId: number;
    reason: "DAMAGED_PRODUCT" | "FAKE_PRODUCT" | "NOT_AS_DESCRIBED" | "POOR_QUALITY" | null;
    serviceSeller: number;
    serviceShip: number;
    isAnonymous: boolean;
    images?: string[] | undefined;
}>;
export declare class UpdateReviewResDTO extends UpdateReviewResDTO_base {
}
declare const ReviewQueryDTO_base: import("nestjs-zod").ZodDto<{
    order: "asc" | "desc";
    page: number;
    limit: number;
    sortBy: "createdAt" | "rating";
    orderItemId?: number | undefined;
    sellerId?: number | undefined;
    productId?: number | undefined;
    skuId?: number | undefined;
    userId?: number | undefined;
    rating?: number | undefined;
    isReply?: boolean | undefined;
}, import("zod").ZodObjectDef<{
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    orderItemId: import("zod").ZodOptional<import("zod").ZodNumber>;
    sellerId: import("zod").ZodOptional<import("zod").ZodNumber>;
    productId: import("zod").ZodOptional<import("zod").ZodNumber>;
    skuId: import("zod").ZodOptional<import("zod").ZodNumber>;
    userId: import("zod").ZodOptional<import("zod").ZodNumber>;
    rating: import("zod").ZodOptional<import("zod").ZodNumber>;
    sortBy: import("zod").ZodDefault<import("zod").ZodEnum<["createdAt", "rating"]>>;
    order: import("zod").ZodDefault<import("zod").ZodEnum<["asc", "desc"]>>;
    isReply: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny>, {
    page?: number | undefined;
    limit?: number | undefined;
    orderItemId?: number | undefined;
    sellerId?: number | undefined;
    productId?: number | undefined;
    skuId?: number | undefined;
    userId?: number | undefined;
    rating?: number | undefined;
    sortBy?: "createdAt" | "rating" | undefined;
    order?: "asc" | "desc" | undefined;
    isReply?: boolean | undefined;
}>;
export declare class ReviewQueryDTO extends ReviewQueryDTO_base {
}
declare const CreateReviewReplyBodyDTO_base: import("nestjs-zod").ZodDto<{
    comment: string;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    comment: import("zod").ZodString;
    sellerId: import("zod").ZodNumber;
    reviewId: import("zod").ZodNumber;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "comment">, "strip", import("zod").ZodTypeAny>, {
    comment: string;
}>;
export declare class CreateReviewReplyBodyDTO extends CreateReviewReplyBodyDTO_base {
}
declare const UpdateReviewReplyBodyDTO_base: import("nestjs-zod").ZodDto<{
    comment: string;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    comment: import("zod").ZodString;
    sellerId: import("zod").ZodNumber;
    reviewId: import("zod").ZodNumber;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "comment">, "strip", import("zod").ZodTypeAny>, {
    comment: string;
}>;
export declare class UpdateReviewReplyBodyDTO extends UpdateReviewReplyBodyDTO_base {
}
export {};
