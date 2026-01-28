import { ReviewRepository } from './review.repository';
import { CreateReviewBodyType, CreateReviewReplyBodyType, ReviewQueryType, UpdateReviewBodyType, UpdateReviewReplyBodyType } from './review.schema';
import { CommonOrderRepository } from 'src/common/repositories/common-order.repository';
import { CommonProductRepository } from 'src/common/repositories/common-product.repository';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ReviewService {
    private readonly reviewRepository;
    private readonly commonOrderRepository;
    private readonly commonProductRepository;
    private readonly prismaService;
    constructor(reviewRepository: ReviewRepository, commonOrderRepository: CommonOrderRepository, commonProductRepository: CommonProductRepository, prismaService: PrismaService);
    private containsBlacklistedWords;
    private updateRating;
    getAllReviews(query: ReviewQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getReviewById(id: number): Promise<any>;
    createReview({ data, userId, }: {
        data: CreateReviewBodyType;
        userId: number;
    }): Promise<{
        message: string;
    }>;
    updateReview({ id, data, userId, }: {
        id: number;
        data: UpdateReviewBodyType;
        userId: number;
    }): Promise<any>;
    deleteReview({ id, userId, roleName, }: {
        id: number;
        userId: number;
        roleName: string;
    }): Promise<{
        message: string;
    }>;
    createReviewReply({ id, userId, roleName, data, }: {
        id: number;
        userId: number;
        roleName: any;
        data: CreateReviewReplyBodyType;
    }): Promise<{
        message: string;
    }>;
    updateReviewReply({ id, userId, roleName, data, }: {
        id: number;
        userId: number;
        roleName: any;
        data: UpdateReviewReplyBodyType;
    }): Promise<{
        message: string;
    }>;
    deleteReviewReply({ id, userId, roleName, }: {
        id: number;
        userId: number;
        roleName: any;
    }): Promise<{
        message: string;
    }>;
}
