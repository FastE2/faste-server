import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterShopBodyType, UpdateShopBodyType } from './shop.schema';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
export type WhereUniqueShopType = { shopid: number } | { slug: string };
@Injectable()
export class ShopRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonRoleRepository: CommonRoleRepository,
  ) {}

  async findAll(pagination: PaginationQueryType): Promise<{
    data: any[];
    totalItem: number;
    page: number;
    limmit: number;
    totalPage: number;
  }> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;
    const [data, totalItem] = await Promise.all([
      this.prismaService.shop.findMany({
        where: {
          deletedAt: null,
        },
        take,
        skip,
      }),
      this.prismaService.shop.count({
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

  async findAllIsPublic(pagination: PaginationQueryType): Promise<{
    data: any[];
    totalItem: number;
    page: number;
    limmit: number;
    totalPage: number;
  }> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;
    const [data, totalItem] = await Promise.all([
      this.prismaService.shop.findMany({
        where: {
          status: 'APPROVED',
          isActive: true,
          deletedAt: null,
        },
        take,
        skip,
      }),
      this.prismaService.shop.count({
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

  findOne(where: WhereUniqueShopType): Promise<any> {
    return this.prismaService.shop.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        Template: {
          where: {
            isActive: true,
          },
          include: {
            widgets: true,
          },
        },
      },
    });
  }

  create({
    userId,
    data,
  }: {
    userId: number;
    data: RegisterShopBodyType;
  }): Promise<any> {
    const { deliveryTypeIds, ...fillterData } = data;
    return this.prismaService.$transaction(async (tx) => {
      const roleSellerId = await this.commonRoleRepository.getSellerRoleId();
      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          roleId: roleSellerId!,
        },
      });
      const shop = await tx.shop.create({
        data: {
          ...fillterData,
          shopid: userId,
          shopShipping: {
            connect: deliveryTypeIds?.map((id) => ({ id })) ?? [],
          },
        },
      });

      return shop;
    });
  }

  async update({
    id,
    data,
  }: {
    id: number;
    updatedById: number;
    data: UpdateShopBodyType;
  }): Promise<any> {
    return this.prismaService.shop.update({
      where: {
        shopid: id,
        deletedAt: null,
      },
      data: {
        ...data,
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
      ? this.prismaService.shop.delete({
          where: {
            shopid: id,
          },
        })
      : this.prismaService.shop.update({
          where: {
            shopid: id,
            deletedAt: null,
          },
          data: {
            deletedAt: new Date(),
            deletedById,
          },
        });
  }
}
