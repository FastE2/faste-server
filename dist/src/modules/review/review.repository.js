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
exports.ReviewRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReviewRepository = class ReviewRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async list(query) {
        const { page, limit, orderItemId, productId, skuId, userId, sellerId, isReply, rating, sortBy, order, } = query;
        const skip = (page - 1) * limit;
        const take = limit;
        const where = {};
        if (orderItemId)
            where.orderItemId = orderItemId;
        if (sellerId)
            where.sellerId = sellerId;
        if (productId)
            where.productId = productId;
        if (typeof isReply === 'boolean') {
            where.reply = isReply ? { isNot: null } : null;
        }
        if (skuId)
            where.skuId = skuId;
        if (userId)
            where.userId = userId;
        if (rating)
            where.rating = rating;
        const [data, totalItem] = await Promise.all([
            this.prismaService.review.findMany({
                where,
                skip,
                take,
                orderBy: { [sortBy]: order },
                select: {
                    id: true,
                    images: true,
                    isAnonymous: true,
                    message: true,
                    orderItemId: true,
                    productId: true,
                    rating: true,
                    reason: true,
                    sellerId: true,
                    serviceSeller: true,
                    serviceShip: true,
                    skuId: true,
                    userId: true,
                    createdAt: true,
                    updatedAt: true,
                    createdBy: {
                        select: {
                            name: true,
                            avatar: true,
                        },
                    },
                    reply: {
                        select: {
                            id: true,
                            comment: true,
                            createdAt: true,
                            updatedAt: true,
                            seller: {
                                select: {
                                    logo: true,
                                    name: true,
                                    shopid: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prismaService.review.count({ where }),
        ]);
        return {
            data,
            totalItem,
            page,
            limit,
            totalPage: Math.ceil(totalItem / limit),
        };
    }
    findById(where) {
        return this.prismaService.review.findFirst({
            where,
        });
    }
    create({ userId, data, }) {
        return this.prismaService.review.create({
            data: {
                ...data,
                userId,
            },
        });
    }
    update({ id, userId, data, }) {
        return this.prismaService.review.update({
            where: {
                id,
                userId,
            },
            data,
        });
    }
    delete({ id }) {
        return this.prismaService.review.delete({
            where: { id },
        });
    }
    findByIdReply(where) {
        return this.prismaService.reviewReply.findFirst({
            where,
        });
    }
    createReply({ data, }) {
        return this.prismaService.reviewReply.create({
            data,
        });
    }
    updateReply({ id, sellerId, data, }) {
        return this.prismaService.reviewReply.update({
            where: {
                reviewId: id,
                sellerId,
            },
            data,
        });
    }
    deleteReply({ id }) {
        return this.prismaService.reviewReply.delete({
            where: { reviewId: id },
        });
    }
};
exports.ReviewRepository = ReviewRepository;
exports.ReviewRepository = ReviewRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewRepository);
//# sourceMappingURL=review.repository.js.map