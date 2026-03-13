import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { zodToPrismaSelect } from 'src/utils/zod-prisma-select.util';
import { UserType } from 'src/common/schemas/user.schema';
import { CreateRoleBodyType, UpdateRoleBodyType } from './role.schema';
import { RoleType } from 'src/common/schemas/role.schema';
import { RolePermissionsType } from 'src/common/schemas/permission.schema';

@Injectable()
export class RoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(pagination: PaginationQueryType): Promise<{
    data: RoleType[];
    totalItem: number;
    page: number;
    limmit: number;
    totalPage: number;
  }> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;
    // console.log(zodToPrismaSelect(GetUsersInclueRoleSchema));
    const [data, totalItem] = await Promise.all([
      this.prismaService.role.findMany({
        where: {
          deletedAt: null,
        },
        take,
        skip,
      }),
      this.prismaService.role.count({
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

  findById(id: number): Promise<RoleType | null> {
    return this.prismaService.role.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findByIdIncludePermissions(id: number): Promise<RoleType | null> {
    return this.prismaService.role.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        permissions: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }

  create({
    createdById,
    data,
  }: {
    createdById: number;
    data: CreateRoleBodyType;
  }): Promise<RoleType> {
    return this.prismaService.role.create({
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
    data: UpdateRoleBodyType;
  }): Promise<RolePermissionsType> {
    if (data.permissionIds.length > 0) {
      const permissions = await this.prismaService.permission.findMany({
        where: {
          id: {
            in: data.permissionIds,
          },
        },
      });
      const deletedPermission = permissions.filter(
        (permission) => permission.deletedAt,
      );
      if (deletedPermission.length > 0) {
        const deletedPermissionIds = deletedPermission
          .map((permission) => permission.id)
          .join(',');
        throw new Error(
          `Permission with id has been deleted: ${deletedPermissionIds}`,
        );
      }
    }
    return this.prismaService.role.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        permissions: {
          set: data.permissionIds.map((id) => ({ id })),
        },
        updatedById,
      },
      include: {
        permissions: {
          where: {
            deletedAt: null,
          },
        },
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
      ? this.prismaService.role.delete({
          where: {
            id,
          },
        })
      : this.prismaService.role.update({
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
