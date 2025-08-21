import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { zodToPrismaSelect } from 'src/utils/zod-prisma-select.util';
import {
  BrandType,
  CreateBrandBodyType,
  UpdateBrandBodyType,
} from './brand.schema';
import { RoleType } from 'src/common/schemas/role.schema';
import { RolePermissionsType } from 'src/common/schemas/permission.schema';

@Injectable()
export class BrandRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(pagination: PaginationQueryType): Promise<{
    data: BrandType[];
    totalItem: number;
    page: number;
    limmit: number;
    totalPage: number;
  }> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;
    // console.log(zodToPrismaSelect(GetUsersInclueRoleSchema));
    const [data, totalItem] = await Promise.all([
      this.prismaService.brand.findMany({
        where: {
          deletedAt: null,
        },
        take,
        skip,
      }),
      this.prismaService.brand.count({
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

  findById(id: number): Promise<BrandType | null> {
    return this.prismaService.brand.findUnique({
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
    data: CreateBrandBodyType;
  }): Promise<BrandType> {
    return this.prismaService.brand.create({
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
    data: UpdateBrandBodyType;
  }): Promise<BrandType> {
    return this.prismaService.brand.update({
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
      ? this.prismaService.brand.delete({
          where: {
            id,
          },
        })
      : this.prismaService.brand.update({
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
