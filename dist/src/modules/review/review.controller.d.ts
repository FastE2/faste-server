import { GetParamsDTO } from 'src/common/dtos/request.dto';
import { ReviewService } from './review.service';
import { CreateReviewBodyDTO, CreateReviewReplyBodyDTO, ReviewQueryDTO, UpdateReviewBodyDTO, UpdateReviewReplyBodyDTO } from './review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getAllReviews(query: ReviewQueryDTO): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getReviewById(params: GetParamsDTO): Promise<any>;
    createReview(body: CreateReviewBodyDTO, userId: number): Promise<{
        message: string;
    }>;
    createReplyReview(body: CreateReviewBodyDTO, userId: number): Promise<{
        message: string;
    }>;
    updateReview(params: GetParamsDTO, body: UpdateReviewBodyDTO, userId: number): Promise<any>;
    deleteReview(params: GetParamsDTO, userId: number, roleName: string): Promise<{
        message: string;
    }>;
    createReviewReply(params: GetParamsDTO, userId: number, roleName: string, body: CreateReviewReplyBodyDTO): Promise<{
        message: string;
    }>;
    updateReviewReply(params: GetParamsDTO, userId: number, roleName: string, body: UpdateReviewReplyBodyDTO): Promise<{
        message: string;
    }>;
    deleteReviewReply(params: GetParamsDTO, userId: number, roleName: string): Promise<{
        message: string;
    }>;
}
