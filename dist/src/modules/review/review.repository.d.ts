import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewBodyType, UpdateReviewBodyType, ReviewQueryType, CreateReviewReplyBodyType, UpdateReviewReplyBodyType } from './review.schema';
type whereUniqueType = {
    id: number;
} | {
    id: number;
    userId: number;
};
type whereUniqueReplyType = {
    id: number;
} | {
    reviewId: number;
} | {
    id: number;
    sellerId: number;
} | {
    reviewId: number;
    sellerId: number;
};
export declare class ReviewRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(query: ReviewQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    findById(where: whereUniqueType): Promise<any>;
    create({ userId, data, }: {
        userId: number;
        data: CreateReviewBodyType;
    }): Promise<any>;
    update({ id, userId, data, }: {
        id: number;
        userId: number;
        data: UpdateReviewBodyType;
    }): Promise<any>;
    delete({ id }: {
        id: number;
    }): import(".prisma/client").Prisma.Prisma__ReviewClient<{
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
        reason: import(".prisma/client").$Enums.ReviewBadReason | null;
        serviceSeller: number;
        serviceShip: number;
        isAnonymous: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findByIdReply(where: whereUniqueReplyType): Promise<any>;
    createReply({ data, }: {
        data: CreateReviewReplyBodyType & {
            sellerId: number;
            reviewId: number;
        };
    }): import(".prisma/client").Prisma.Prisma__ReviewReplyClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        sellerId: number;
        comment: string;
        reviewId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    updateReply({ id, sellerId, data, }: {
        id: number;
        sellerId: number;
        data: UpdateReviewReplyBodyType;
    }): Promise<any>;
    deleteReply({ id }: {
        id: number;
    }): import(".prisma/client").Prisma.Prisma__ReviewReplyClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        sellerId: number;
        comment: string;
        reviewId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
export {};
