import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersInclueRoleSchema, GetUsersResType } from './user.schema';
import { zodToPrismaSelect } from 'src/utils/zod-prisma-select.util';

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
}
