import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import {
  ReviewType,
  CreateReviewBodyType,
  UpdateReviewBodyType,
  ReviewQueryType,
} from './review.schema';

type whereUniqueType =
  | {
      id: number;
    }
  | { id: number; userId: number };

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
      rating,
      sortBy,
      order,
    } = query;

    const skip = (page - 1) * limit;
    const take = limit;

    // build where filter
    const where: any = { deletedAt: null };
    if (orderItemId) where.orderItemId = orderItemId;
    if (productId) where.productId = productId;
    if (skuId) where.skuId = skuId;
    if (userId) where.userId = userId;
    if (rating) where.rating = rating;

    const [data, totalItem] = await Promise.all([
      this.prismaService.review.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: order },
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
}
