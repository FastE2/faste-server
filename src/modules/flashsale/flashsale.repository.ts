import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FlashSaleStatus } from 'src/common/constants/flash-sale.constant';
import {
  FlashSaleListQueryType,
  CreateFlashSaleBodyType,
  UpdateFlashSaleBodyType,
} from './flashsale.schema';

@Injectable()
export class FlashSaleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(query: FlashSaleListQueryType): Promise<{
    data: any[];
    totalItem: number;
    page: number;
    limmit: number;
    totalPage: number;
  }> {
    const skip = (query.page - 1) * query.limit;
    const take = query.limit;
    const where: any = { deletedAt: null };
    if (query.type) where.type = query.type;
    if (query.status) where.status = query.status;
    if (query.createdById) where.createdById = query.createdById;

    const [data, totalItem] = await Promise.all([
      this.prismaService.flashSale.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.flashSale.count({
        where,
      }),
    ]);

    return {
      data,
      totalItem,
      page: query.page,
      limmit: query.limit,
      totalPage: Math.ceil(totalItem / query.limit),
    };
  }

  findById(id: number): Promise<any> {
    return this.prismaService.flashSale.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findBySellerById({
    id,
    createdById,
  }: {
    id: number;
    createdById: number;
  }): Promise<any> {
    return this.prismaService.flashSale.findUnique({
      where: {
        id,
        deletedAt: null,
        createdById,
      },
    });
  }

  create({
    createdById,
    data,
  }: {
    createdById: number;
    data: Omit<CreateFlashSaleBodyType, 'isDraft'> & {
      status: FlashSaleStatus;
    };
  }): Promise<any> {
    return this.prismaService.flashSale.create({
      data: {
        ...data,
        createdById,
      },
    });
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number;
    updatedById: number;
    data: Omit<UpdateFlashSaleBodyType, 'isDraft'> & {
      status?: FlashSaleStatus;
    };
  }): Promise<any> {
    return this.prismaService.flashSale.update({
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
      ? this.prismaService.flashSale.delete({
          where: {
            id,
          },
        })
      : this.prismaService.flashSale.update({
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
