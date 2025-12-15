import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { NotFoundRecordException } from 'src/common/errors';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';

import { ReviewRepository } from './review.repository';
import {
  CreateReviewBodyType,
  ReviewQueryType,
  UpdateReviewBodyType,
} from './review.schema';
import { CommonOrderRepository } from 'src/common/repositories/common-order.repository';
import { ROLE_NAME } from 'src/common/constants/role-base.constant';
import { BLACKLIST_WORDS } from 'src/common/constants/blacklist.constant';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly commonOrderRepository: CommonOrderRepository,
  ) {}

  private containsBlacklistedWords(message: string): boolean {
    if (!message) return false;
    const lower = message.toLowerCase();
    return BLACKLIST_WORDS.some((word) => lower.includes(word));
  }

  // ===============================
  // GET LIST
  // ===============================
  async getAllReviews(query: ReviewQueryType) {
    try {
      return await this.reviewRepository.list(query);
    } catch (error) {
      console.log('/reviews', error);
      throw error;
    }
  }

  // ===============================
  // GET BY ID
  // ===============================
  async getReviewById(id: number) {
    try {
      const review = await this.reviewRepository.findById({ id });
      if (!review) {
        throw NotFoundRecordException;
      }
      return review;
    } catch (error) {
      console.log('/reviews/:id', error);
      throw error;
    }
  }

  // ===============================
  // CREATE
  // ===============================
  async createReview({
    data,
    userId,
  }: {
    data: CreateReviewBodyType;
    userId: number;
  }) {
    try {
      if (data.message) {
        if (this.containsBlacklistedWords(data.message)) {
          throw new BadRequestException('Message contains forbidden words');
        }
      }
      const order = await this.commonOrderRepository.findUniqueOrder(
        data.orderItemId,
      );
      if (!order) {
        throw NotFoundRecordException;
      }
      const { userId: orderUserId, status, shopId, items } = order;
      const item = items[0];

      const errors: string[] = [];

      if (orderUserId !== userId) errors.push('User mismatch');
      if (status !== 'RECEIVED') errors.push('Order not received');
      if (shopId !== data.sellerId) errors.push('Seller mismatch');
      if (
        !item ||
        item.productId !== data.productId ||
        item.skuId !== data.skuId
      )
        errors.push('Product or SKU mismatch');

      if (errors.length > 0) throw new Error(errors.join('; '));
      return await this.reviewRepository.create({
        data,
        userId,
      });
    } catch (error) {
      console.log('/reviews', error);
      throw error;
    }
  }

  // ===============================
  // UPDATE (owner only)
  // ===============================
  async updateReview({
    id,
    data,
    userId,
  }: {
    id: number;
    data: UpdateReviewBodyType;
    userId: number;
  }) {
    try {
      if (data.message) {
        if (this.containsBlacklistedWords(data.message)) {
          throw new BadRequestException('Message contains forbidden words');
        }
      }
      return await this.reviewRepository.update({
        id,
        data,
        userId,
      });
    } catch (error) {
      console.log('/reviews/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  // ===============================
  // DELETE (soft delete)
  // ===============================
  async deleteReview({
    id,
    userId,
    roleName,
  }: {
    id: number;
    userId: number;
    roleName: string;
  }) {
    try {
      const checkReviewByUser = await this.reviewRepository.findById({
        id,
        userId,
      });

      if (roleName !== ROLE_NAME.ADMIN || !checkReviewByUser) {
        throw new ForbiddenException();
      }
      await this.reviewRepository.delete({
        id,
      });

      return { message: 'Delete review successfully' };
    } catch (error) {
      console.log('/reviews/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  // ===============================
  // ADMIN – APPROVE REVIEW
  // ===============================
  // async approveReview({
  //   id,
  //   approvedById,
  // }: {
  //   id: number;
  //   approvedById: number;
  // }) {
  //   try {
  //     await this.reviewRepository.approve({
  //       id,
  //       approvedById,
  //     });

  //     return { message: 'Approve review successfully' };
  //   } catch (error) {
  //     console.log('/reviews/:id/approve', error);
  //     if (isPrismaRecordNotFound(error)) {
  //       throw NotFoundRecordException;
  //     }
  //     throw error;
  //   }
  // }
}
