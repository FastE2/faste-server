import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FlashSaleStatus } from 'src/common/constants/flash-sale.constant';
import {
  FlashSaleListQueryType,
  CreateFlashSaleBodyType,
  UpdateFlashSaleBodyType,
} from './flashsale.schema';
import {
  CreateFlashSaleItemBodyType,
  UpdateFlashSaleItemBodyType,
} from './flashsale-item.schema';
import { PaginationQueryType } from 'src/common/schemas/request.schema';

@Injectable()
export class FlashSaleItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(
    query: PaginationQueryType,
    flashSaleId: number,
  ): Promise<{
    data: any[];
    totalItem: number;
    page: number;
    limmit: number;
    totalPage: number;
  }> {
    const skip = (query.page - 1) * query.limit;
    const take = query.limit;
    const where: any = { deletedAt: null };
    where.flashSaleId = flashSaleId;

    const [items, totalItem] = await Promise.all([
      this.prismaService.flashSaleItem.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: 'desc' },
        include: {
          sku: {
            include: {
              product: true,
            },
          },
        },
      }),
      this.prismaService.flashSaleItem.count({
        where,
      }),
    ]);

    const productMap = new Map<number, any>();

    for (const item of items) {
      const product = item.sku.product;

      if (!productMap.has(product.id)) {
        productMap.set(product.id, {
          ...product,
          skus: [],
        });
      }

      productMap.get(product.id).skus.push({
        id: item.sku.id,
        price: item.sku.price,
        quantity: item.sku.quantity,
        image: item.sku.image,
        flashSaleItem: {
          id: item.id,
          flashSaleId: item.flashSaleId,
          flashPrice: item.flashPrice,
          stock: item.flashPrice,
          sold: item.sold,
        },
      });
    }

    return {
      data: Array.from(productMap.values()),
      totalItem,
      page: query.page,
      limmit: query.limit,
      totalPage: Math.ceil(totalItem / query.limit),
    };
  }

  findBySellerById({
    id,
    createdById,
  }: {
    id: number;
    createdById: number;
  }): Promise<any> {
    return this.prismaService.flashSaleItem.findUnique({
      where: {
        id,
        deletedAt: null,
        createdById,
      },
    });
  }

  createMany({
    id,
    data,
    createdById,
  }: {
    id: number;
    createdById: number;
    data: CreateFlashSaleItemBodyType[];
  }) {
    return this.prismaService.flashSaleItem.createMany({
      data: data.map((item) => ({
        flashSaleId: id,
        skuId: item.skuId,
        flashPrice: item.flashPrice,
        stock: item.stock,
        createdById,
      })),
    });
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number;
    updatedById: number;
    data: UpdateFlashSaleItemBodyType;
  }): Promise<any> {
    return this.prismaService.flashSaleItem.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...data,
        updatedById,
      },
    });
  }

  delete(
    {
      id,
      deletedById,
    }: {
      id: number;
      deletedById: number;
    },
    isHard?: boolean,
  ): Promise<any> {
    return isHard
      ? this.prismaService.flashSaleItem.delete({
          where: {
            id,
          },
        })
      : this.prismaService.flashSaleItem.update({
          where: {
            id,
            deletedAt: null,
          },
          data: {
            deletedAt: new Date(),
            deletedById,
          },
        });
  }
}
