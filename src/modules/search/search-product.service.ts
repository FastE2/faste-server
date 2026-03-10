import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface SearchProductsParams {
  keyword?: string;
  categoryIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  orderBy?: 'popular' | 'new' | 'bestseller';
}

interface suggestKeywordType {
  keyword: string;
}

@Injectable()
export class SearchProductService {
  constructor(private readonly prisma: PrismaService) {}

  async search(params: SearchProductsParams) {
    const {
      keyword,
      categoryIds,
      minPrice,
      maxPrice,
      rating,
      page = 1,
      limit = 20,
      sortBy,
      order = 'desc',
      orderBy,
    } = params;

    const where: Prisma.ProductWhereInput = {};

    /**
     * keyword search
     */
    if (keyword) {
      where.OR = [
        {
          name: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
      ];
    }

    /**
     * category filter
     */
    if (categoryIds && categoryIds.length > 0) {
      where.categories = {
        some: {
          categoryId: {
            in: categoryIds,
          },
        },
      };
    }

    /**
     * price filter
     */
    if (minPrice || maxPrice) {
      where.basePrice = {};

      if (minPrice) where.basePrice.gte = minPrice;
      if (maxPrice) where.basePrice.lte = maxPrice;
    }

    /**
     * rating filter
     */
    if (rating) {
      where.rating = {
        gte: rating,
      };
    }

    /**
     * order builder
     */
    let orderByQuery: Prisma.ProductOrderByWithRelationInput = {};

    if (sortBy) {
      orderByQuery[sortBy] = order;
    }

    if (orderBy === 'popular') {
      orderByQuery = { totalViews: 'desc' };
    }

    if (orderBy === 'new') {
      orderByQuery = { createdAt: 'desc' };
    }

    if (orderBy === 'bestseller') {
      orderByQuery = { sold: 'desc' };
    }

    /**
     * query
     */
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: orderByQuery,
        include: {
          categories: true,
          skus: true,
        },
      }),

      this.prisma.product.count({ where }),
    ]);

    return {
      total,
      page,
      limit,
      products,
    };
  }

  async suggest(keyword: string): Promise<suggestKeywordType[]> {
    if (!keyword || keyword.trim().length < 2) {
      return [];
    }

    const results = await this.prisma.product.findMany({
      where: {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
      select: {
        name: true,
      },
      take: 10,
    });

    const keywords = new Set<string>();

    results.forEach((p) => {
      keywords.add(p.name);
    });

    return Array.from(keywords).map((k) => ({
      keyword: k,
    }));
  }
}
