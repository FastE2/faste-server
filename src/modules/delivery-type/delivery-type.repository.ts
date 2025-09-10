import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  DeliveryTypeType,
  CreateDeliveryTypeBodyType,
  UpdateDeliveryTypeBodyType,
} from './delivery-type.schema';

@Injectable()
export class DeliveryTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(pagination: PaginationQueryType): Promise<{
    data: DeliveryTypeType[];
    totalItem: number;
    page: number;
    limmit: number;
    totalPage: number;
  }> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;

    const [data, totalItem] = await Promise.all([
      this.prismaService.deliveryType.findMany({
        where: {
          deletedAt: null,
        },
        take,
        skip,
      }),
      this.prismaService.deliveryType.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    return {
      data,
      totalItem,
      page: pagination.page,
      limmit: pagination.limit,
      totalPage: Math.ceil(totalItem / pagination.limit),
    };
  }

  findById(id: number): Promise<DeliveryTypeType | null> {
    return this.prismaService.deliveryType.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  create({
    createdById,
    data,
  }: {
    createdById: number;
    data: CreateDeliveryTypeBodyType;
  }): Promise<DeliveryTypeType> {
    return this.prismaService.deliveryType.create({
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
    data: UpdateDeliveryTypeBodyType;
  }): Promise<DeliveryTypeType> {
    return this.prismaService.deliveryType.update({
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
      ? this.prismaService.deliveryType.delete({
          where: {
            id,
          },
        })
      : this.prismaService.deliveryType.update({
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
