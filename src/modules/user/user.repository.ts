import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserBodyType,
  GetUsersInclueRoleSchema,
  GetUsersResType,
} from './user.schema';
import { zodToPrismaSelect } from 'src/utils/zod-prisma-select.util';
import { UserType } from 'src/common/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(pagination: PaginationQueryType): Promise<GetUsersResType> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;
    // console.log(zodToPrismaSelect(GetUsersInclueRoleSchema));
    const [data, totalItem] = await Promise.all([
      this.prismaService.user.findMany({
        where: {
          deletedAt: null,
        },
        omit: {
          password: true,
          totpSecret: true,
        },
        take,
        include: {
          role: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        skip,
      }),
      this.prismaService.user.count({
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
  update(
    where: { id: number },
    data: Partial<UserType>,
  ): Promise<UserType | null> {
    return this.prismaService.user.update({
      where: {
        ...where,
        deletedAt: null,
      },
      data,
    });
  }
  create({
    createdById,
    data,
  }: {
    createdById: number | null;
    data: CreateUserBodyType;
  }): Promise<Omit<UserType, 'password' | 'totpSecret'>> {
    return this.prismaService.user.create({
      data: {
        ...data,
        createdById,
      },
      omit: {
        password: true,
        totpSecret: true,
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
  ): Promise<UserType> {
    return isHard
      ? this.prismaService.user.delete({
          where: {
            id,
          },
        })
      : this.prismaService.user.update({
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
