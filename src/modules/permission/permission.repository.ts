import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PermissionType,
  RolePermissionsType,
} from 'src/common/schemas/permission.schema';
import {
  CreatePermissionBodyType,
  UpdatePermissionBodyType,
} from './permission.schema';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(): Promise<{
    data: PermissionType[];
    totalItem: number;
  }> {
    const [data, totalItem] = await Promise.all([
      this.prismaService.permission.findMany({
        where: {
          deletedAt: null,
        },
      }),
      this.prismaService.permission.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    return {
      data,
      totalItem,
    };
  }

  findById(id: number): Promise<PermissionType | null> {
    return this.prismaService.permission.findUnique({
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
    data: CreatePermissionBodyType;
  }): Promise<PermissionType> {
    return this.prismaService.permission.create({
      data: {
        ...data,
        createdById,
      },
    });
  }

  update({
    id,
    updatedById,
    data,
  }: {
    id: number;
    updatedById: number;
    data: UpdatePermissionBodyType;
  }): Promise<PermissionType & { roles: { id: number }[] }> {
    return this.prismaService.permission.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...data,
        updatedById,
      },
      include: {
        roles: true,
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
      ? this.prismaService.permission.delete({
          where: {
            id,
          },
        })
      : this.prismaService.permission.update({
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
