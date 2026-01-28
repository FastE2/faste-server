import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import {
  ReviewType,
  CreateReviewBodyType,
  UpdateReviewBodyType,
  ReviewQueryType,
  CreateReviewReplyBodyType,
  UpdateReviewReplyBodyType,
} from './review.schema';

type whereUniqueType =
  | {
      id: number;
    }
  | { id: number; userId: number };

type whereUniqueReplyType =
  | {
      id: number;
    }
  | { reviewId: number }
  | { id: number; sellerId: number }
  | { reviewId: number; sellerId: number };

@Injectable()
export class ReviewRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // ===============================
  // LIST
  // ===============================
  async list(query: ReviewQueryType): Promise<{
    data: any[];
    totalItem: number;
    page: number;
    limit: number;
    totalPage: number;
  }> {
    const {
      page,
      limit,
      orderItemId,
      productId,
      skuId,
      userId,
      sellerId,
      isReply,
      rating,
      sortBy,
      order,
    } = query;

    const skip = (page - 1) * limit;
    const take = limit;

    // build where filter
    const where: any = {};
    if (orderItemId) where.orderItemId = orderItemId;
    if (sellerId) where.sellerId = sellerId;
    if (productId) where.productId = productId;
    if (typeof isReply === 'boolean') {
      where.reply = isReply ? { isNot: null } : null;
    }
    if (skuId) where.skuId = skuId;
    if (userId) where.userId = userId;
    if (rating) where.rating = rating;

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

  // ===============================
  // FIND BY ID
  // ===============================
  findById(where: whereUniqueType): Promise<any> {
    return this.prismaService.review.findFirst({
      where,
    });
  }

  // ===============================
  // CREATE
  // ===============================
  create({
    userId,
    data,
  }: {
    userId: number;
    data: CreateReviewBodyType;
  }): Promise<any> {
    return this.prismaService.review.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  // ===============================
  // UPDATE (owner only, pending only)
  // ===============================
  update({
    id,
    userId,
    data,
  }: {
    id: number;
    userId: number;
    data: UpdateReviewBodyType;
  }): Promise<any> {
    return this.prismaService.review.update({
      where: {
        id,
        userId,
      },
      data,
    });
  }

  // ===============================
  // DELETE (hard)
  // ===============================
  delete({ id }: { id: number }) {
    return this.prismaService.review.delete({
      where: { id },
    });
  }

  findByIdReply(where: whereUniqueReplyType): Promise<any> {
    return this.prismaService.reviewReply.findFirst({
      where,
    });
  }

  createReply({
    data,
  }: {
    data: CreateReviewReplyBodyType & { sellerId: number; reviewId: number };
  }) {
    return this.prismaService.reviewReply.create({
      data,
    });
  }

  updateReply({
    id,
    sellerId,
    data,
  }: {
    id: number;
    sellerId: number;
    data: UpdateReviewReplyBodyType;
  }): Promise<any> {
    return this.prismaService.reviewReply.update({
      where: {
        reviewId: id,
        sellerId,
      },
      data,
    });
  }

  deleteReply({ id }: { id: number }) {
    return this.prismaService.reviewReply.delete({
      where: { reviewId: id },
    });
  }
}
