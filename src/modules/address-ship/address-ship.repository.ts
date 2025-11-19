import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { zodToPrismaSelect } from 'src/utils/zod-prisma-select.util';
import {
  AddressShipType,
  CreateAddressShipBodyType,
  UpdateAddressShipBodyType,
} from './address-ship.schema';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressShipRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(
    userId: number,
    pagination: PaginationQueryType,
  ): Promise<{
    data: any[];
    totalItem: number;
    page: number;
    limmit: number;
    totalPage: number;
  }> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;
    // console.log(zodToPrismaSelect(GetUsersInclueRoleSchema));
    const [data, totalItem] = await Promise.all([
      this.prismaService.addressShip.findMany({
        where: {
          userId,
          deletedAt: null,
        },
        take,
        skip,
      }),
      this.prismaService.addressShip.count({
        where: {
          userId,
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

  findById(userId: number, id: number): Promise<AddressShipType | null> {
    return this.prismaService.addressShip.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });
  }

  findByIdIsDefault(id: number): Promise<AddressShipType | null> {
    return this.prismaService.addressShip.findUnique({
      where: {
        id,
        isDefault: true,
        deletedAt: null,
      },
    });
  }

  create({
    userId,
    data,
  }: {
    userId: number;
    data: CreateAddressShipBodyType;
  }): Promise<AddressShipType> {
    return this.prismaService.addressShip.create({
      data: {
        ...data,
        userId,
        geoinfo: data.geoinfo ?? Prisma.JsonNull,
      },
    });
  }

  async update({
    id,
    userId,
    data,
  }: {
    id: number;
    userId: number;
    data: UpdateAddressShipBodyType;
  }): Promise<AddressShipType> {
    return this.prismaService.addressShip.update({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      data: {
        ...data,
        geoinfo: data.geoinfo ?? Prisma.JsonNull,
      },
    });
  }

  delete(
    {
      id,
      userId,
    }: {
      id: number;
      userId: number;
    },
    isHard?: boolean,
  ): Promise<any> {
    return isHard
      ? this.prismaService.addressShip.delete({
          where: {
            id,
            userId,
          },
        })
      : this.prismaService.addressShip.update({
          where: {
            id,
            userId,
            deletedAt: null,
          },
          data: {
            deletedAt: new Date(),
          },
        });
  }
}
