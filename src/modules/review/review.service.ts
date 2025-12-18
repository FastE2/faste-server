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
  CreateReviewReplyBodyType,
  ReviewQueryType,
  UpdateReviewBodyType,
  UpdateReviewReplyBodyType,
} from './review.schema';
import { CommonOrderRepository } from 'src/common/repositories/common-order.repository';
import { ROLE_NAME } from 'src/common/constants/role-base.constant';
import { BLACKLIST_WORDS } from 'src/common/constants/blacklist.constant';
import { CommonProductRepository } from 'src/common/repositories/common-product.repository';
import { float } from '@elastic/elasticsearch/lib/api/types';
import { PrismaService } from 'src/prisma/prisma.service';
interface ProductRating {
  rating: float;
  ratingCount: number;
  rating1Count: number;
  rating2Count: number;
  rating3Count: number;
  rating4Count: number;
  rating5Count: number;
}

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly commonOrderRepository: CommonOrderRepository,
    private readonly commonProductRepository: CommonProductRepository,
    private readonly prismaService: PrismaService,
  ) {}

  private containsBlacklistedWords(message: string): boolean {
    if (!message) return false;
    const lower = message.toLowerCase();
    return BLACKLIST_WORDS.some((word) => lower.includes(word));
  }

  private updateRating(
    product: ProductRating,
    newRating: number,
  ): ProductRating {
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

    const totalRating =
      updatedProduct.rating1Count * 1 +
      updatedProduct.rating2Count * 2 +
      updatedProduct.rating3Count * 3 +
      updatedProduct.rating4Count * 4 +
      updatedProduct.rating5Count * 5;

    updatedProduct.rating = totalRating / updatedProduct.ratingCount;

    return updatedProduct;
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
      const [order, product] = await Promise.all([
        this.commonOrderRepository.findUniqueOrder(data.orderItemId),
        this.commonProductRepository.findOneUniquePublic({
          id: data.productId,
        }),
      ]);
      if (!order) {
        throw NotFoundRecordException;
      } else if (order.isReviewed) {
        throw new ForbiddenException();
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

      if (errors.length > 0) throw new BadRequestException(errors.join('; '));
      const productRating = this.updateRating(
        {
          rating: product.rating,
          rating1Count: product.rating1Count,
          rating2Count: product.rating2Count,
          rating3Count: product.rating3Count,
          rating4Count: product.rating4Count,
          rating5Count: product.rating5Count,
          ratingCount: product.ratingCount,
        },
        data.rating,
      );
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

  async createReviewReply({
    id,
    userId,
    roleName,
    data,
  }: {
    id: number;
    userId: number;
    roleName: any;
    data: CreateReviewReplyBodyType;
  }) {
    try {
      const checkReview = await this.reviewRepository.findByIdReply({
        reviewId: id,
        sellerId: userId,
      });

      if (roleName !== ROLE_NAME.ADMIN && roleName !== ROLE_NAME.SELLER) {
        throw new ForbiddenException();
      }
      if (checkReview) {
        throw new BadRequestException('Review reply already');
      }
      await this.reviewRepository.createReply({
        data: {
          ...data,
          reviewId: id,
          sellerId: userId,
        },
      });

      return { message: 'Create review reply successfully' };
    } catch (error) {
      console.log('/reviews/reply/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async updateReviewReply({
    id,
    userId,
    roleName,
    data,
  }: {
    id: number;
    userId: number;
    roleName: any;
    data: UpdateReviewReplyBodyType;
  }) {
    try {
      const checkReview = await this.reviewRepository.findByIdReply({
        reviewId: id,
        sellerId: userId,
      });

      if (
        roleName !== ROLE_NAME.ADMIN &&
        roleName !== ROLE_NAME.SELLER &&
        !checkReview
      ) {
        throw new ForbiddenException();
      }
      await this.reviewRepository.updateReply({
        data,
        id,
        sellerId: userId,
      });

      return { message: 'Update review reply successfully' };
    } catch (error) {
      console.log('/reviews/reply/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async deleteReviewReply({
    id,
    userId,
    roleName,
  }: {
    id: number;
    userId: number;
    roleName: any;
  }) {
    try {
      const checkReview = await this.reviewRepository.findByIdReply({
        reviewId: id,
        sellerId: userId,
      });

      if (
        roleName !== ROLE_NAME.ADMIN &&
        roleName !== ROLE_NAME.SELLER &&
        !checkReview
      ) {
        throw new ForbiddenException();
      }
      await this.reviewRepository.deleteReply({
        id,
      });

      return { message: 'Delete review reply successfully' };
    } catch (error) {
      console.log('/reviews/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
