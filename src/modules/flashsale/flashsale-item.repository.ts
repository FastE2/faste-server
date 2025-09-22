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

@Injectable()
export class FlashSaleItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // async list(query: FlashSaleListQueryType): Promise<{
  //   data: any[];
  //   totalItem: number;
  //   page: number;
  //   limmit: number;
  //   totalPage: number;
  // }> {
  //   const skip = (query.page - 1) * query.limit;
  //   const take = query.limit;
  //   const where: any = { deletedAt: null };
  //   if (query.type) where.type = query.type;
  //   if (query.status) where.status = query.status;
  //   if (query.createdById) where.createdById = query.createdById;

  //   const [data, totalItem] = await Promise.all([
  //     this.prismaService.brand.findMany({
  //       where,
  //       take,
  //       skip,
  //       orderBy: { createdAt: 'desc' },
  //     }),
  //     this.prismaService.brand.count({
  //       where,
  //     }),
  //   ]);

  //   return {
  //     data,
  //     totalItem,
  //     page: query.page,
  //     limmit: query.limit,
  //     totalPage: Math.ceil(totalItem / query.limit),
  //   };
  // }

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
