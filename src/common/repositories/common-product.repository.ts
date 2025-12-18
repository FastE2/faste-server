import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRating } from '../types/product';

@Injectable()
export class CommonProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneUniquePublic(
    uniqueValue: { id: number } | { slugId: string },
  ): Promise<any> {
    return this.prismaService.product.findFirst({
      where: {
        ...uniqueValue,
        status: 'PUBLISHED',
        deletedAt: null,
      },
      include: {
        productTranslations: {
          where: {
            deletedAt: null,
          },
        },
        skus: {
          where: { deletedAt: null },
          omit: {
            deletedAt: true,
            deletedById: true,
            skuCode: true,
            updatedAt: true,
            updatedById: true,
          },
        },
        shop: {
          select: {
            shopid: true,
            name: true,
            logo: true,
            slug: true,
            createdAt: true,
            description: true,
            addressShip: true,
          },
        },
        categories: {
          include: {
            category: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
        brand: {
          omit: {
            deletedAt: true,
            deletedById: true,
            id: true,
            createdById: true,
          },
          include: {
            translations: {
              where: {
                deletedAt: null,
              },
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });
  }

  async updateRating({
    id,
    data,
  }: {
    id: number;
    data: ProductRating;
  }): Promise<any> {
    return this.prismaService.product.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...data,
      },
    });
  }
}
