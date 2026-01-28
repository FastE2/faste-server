"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const prisma_1 = require("../../common/errors/prisma");
const review_repository_1 = require("./review.repository");
const common_order_repository_1 = require("../../common/repositories/common-order.repository");
const role_base_constant_1 = require("../../common/constants/role-base.constant");
const blacklist_constant_1 = require("../../common/constants/blacklist.constant");
const common_product_repository_1 = require("../../common/repositories/common-product.repository");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReviewService = class ReviewService {
    reviewRepository;
    commonOrderRepository;
    commonProductRepository;
    prismaService;
    constructor(reviewRepository, commonOrderRepository, commonProductRepository, prismaService) {
        this.reviewRepository = reviewRepository;
        this.commonOrderRepository = commonOrderRepository;
        this.commonProductRepository = commonProductRepository;
        this.prismaService = prismaService;
    }
    containsBlacklistedWords(message) {
        if (!message)
            return false;
        const lower = message.toLowerCase();
        return blacklist_constant_1.BLACKLIST_WORDS.some((word) => lower.includes(word));
    }
    updateRating(product, newRating) {
        const updatedProduct = { ...product };
        switch (newRating) {
            case 1:
                updatedProduct.rating1Count += 1;
                break;
            case 2:
                updatedProduct.rating2Count += 1;
                break;
            case 3:
                updatedProduct.rating3Count += 1;
                break;
            case 4:
                updatedProduct.rating4Count += 1;
                break;
            case 5:
                updatedProduct.rating5Count += 1;
                break;
            default:
                throw new Error('Invalid rating value');
        }
        updatedProduct.ratingCount += 1;
        const totalRating = updatedProduct.rating1Count * 1 +
            updatedProduct.rating2Count * 2 +
            updatedProduct.rating3Count * 3 +
            updatedProduct.rating4Count * 4 +
            updatedProduct.rating5Count * 5;
        updatedProduct.rating = totalRating / updatedProduct.ratingCount;
        return updatedProduct;
    }
    async getAllReviews(query) {
        try {
            return await this.reviewRepository.list(query);
        }
        catch (error) {
            console.log('/reviews', error);
            throw error;
        }
    }
    async getReviewById(id) {
        try {
            const review = await this.reviewRepository.findById({ id });
            if (!review) {
                throw errors_1.NotFoundRecordException;
            }
            return review;
        }
        catch (error) {
            console.log('/reviews/:id', error);
            throw error;
        }
    }
    async createReview({ data, userId, }) {
        try {
            if (data.message) {
                if (this.containsBlacklistedWords(data.message)) {
                    throw new common_1.BadRequestException('Message contains forbidden words');
                }
            }
            const [order, product] = await Promise.all([
                this.commonOrderRepository.findUniqueOrder(data.orderItemId),
                this.commonProductRepository.findOneUniquePublic({
                    id: data.productId,
                }),
            ]);
            if (!order) {
                throw errors_1.NotFoundRecordException;
            }
            else if (order.isReviewed) {
                throw new common_1.ForbiddenException();
            }
            const { userId: orderUserId, status, shopId, items } = order;
            const item = items[0];
            const errors = [];
            if (orderUserId !== userId)
                errors.push('User mismatch');
            if (status !== 'RECEIVED')
                errors.push('Order not received');
            if (shopId !== data.sellerId)
                errors.push('Seller mismatch');
            if (!item ||
                item.productId !== data.productId ||
                item.skuId !== data.skuId)
                errors.push('Product or SKU mismatch');
            if (errors.length > 0)
                throw new common_1.BadRequestException(errors.join('; '));
            const productRating = this.updateRating({
                rating: product.rating,
                rating1Count: product.rating1Count,
                rating2Count: product.rating2Count,
                rating3Count: product.rating3Count,
                rating4Count: product.rating4Count,
                rating5Count: product.rating5Count,
                ratingCount: product.ratingCount,
            }, data.rating);
            await this.prismaService.$transaction(async (tx) => {
                await tx.product.update({
                    where: { id: data.productId },
                    data: {
                        ...productRating,
                    },
                });
                await tx.order.update({
                    where: { id: order.id },
                    data: {
                        isReviewed: true,
                    },
                });
                await tx.review.create({
                    data: {
                        ...data,
                        userId,
                    },
                });
            });
            return {
                message: 'Create review success',
            };
        }
        catch (error) {
            console.log('/reviews', error);
            throw error;
        }
    }
    async updateReview({ id, data, userId, }) {
        try {
            if (data.message) {
                if (this.containsBlacklistedWords(data.message)) {
                    throw new common_1.BadRequestException('Message contains forbidden words');
                }
            }
            return await this.reviewRepository.update({
                id,
                data,
                userId,
            });
        }
        catch (error) {
            console.log('/reviews/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async deleteReview({ id, userId, roleName, }) {
        try {
            const checkReviewByUser = await this.reviewRepository.findById({
                id,
                userId,
            });
            if (roleName !== role_base_constant_1.ROLE_NAME.ADMIN || !checkReviewByUser) {
                throw new common_1.ForbiddenException();
            }
            await this.reviewRepository.delete({
                id,
            });
            return { message: 'Delete review successfully' };
        }
        catch (error) {
            console.log('/reviews/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async createReviewReply({ id, userId, roleName, data, }) {
        try {
            const checkReview = await this.reviewRepository.findByIdReply({
                reviewId: id,
                sellerId: userId,
            });
            if (roleName !== role_base_constant_1.ROLE_NAME.ADMIN && roleName !== role_base_constant_1.ROLE_NAME.SELLER) {
                throw new common_1.ForbiddenException();
            }
            if (checkReview) {
                throw new common_1.BadRequestException('Review reply already');
            }
            await this.reviewRepository.createReply({
                data: {
                    ...data,
                    reviewId: id,
                    sellerId: userId,
                },
            });
            return { message: 'Create review reply successfully' };
        }
        catch (error) {
            console.log('/reviews/reply/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async updateReviewReply({ id, userId, roleName, data, }) {
        try {
            const checkReview = await this.reviewRepository.findByIdReply({
                reviewId: id,
                sellerId: userId,
            });
            if (roleName !== role_base_constant_1.ROLE_NAME.ADMIN &&
                roleName !== role_base_constant_1.ROLE_NAME.SELLER &&
                !checkReview) {
                throw new common_1.ForbiddenException();
            }
            await this.reviewRepository.updateReply({
                data,
                id,
                sellerId: userId,
            });
            return { message: 'Update review reply successfully' };
        }
        catch (error) {
            console.log('/reviews/reply/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async deleteReviewReply({ id, userId, roleName, }) {
        try {
            const checkReview = await this.reviewRepository.findByIdReply({
                reviewId: id,
                sellerId: userId,
            });
            if (roleName !== role_base_constant_1.ROLE_NAME.ADMIN &&
                roleName !== role_base_constant_1.ROLE_NAME.SELLER &&
                !checkReview) {
                throw new common_1.ForbiddenException();
            }
            await this.reviewRepository.deleteReply({
                id,
            });
            return { message: 'Delete review reply successfully' };
        }
        catch (error) {
            console.log('/reviews/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_repository_1.ReviewRepository,
        common_order_repository_1.CommonOrderRepository,
        common_product_repository_1.CommonProductRepository,
        prisma_service_1.PrismaService])
], ReviewService);
//# sourceMappingURL=review.service.js.map