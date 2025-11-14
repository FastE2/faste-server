import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateTemplateBodyType,
  UpdateTemplateBodyType,
} from './template.schema';

@Injectable()
export class TemplateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(pagination: PaginationQueryType): Promise<{
    data: any[];
    totalItem: number;
    page: number;
    limmit: number;
    totalPage: number;
  }> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;
    const [data, totalItem] = await Promise.all([
      this.prismaService.template.findMany({
        take,
        skip,
      }),
      this.prismaService.template.count({}),
    ]);

    return {
      data,
      totalItem,
      page: pagination.page,
      limmit: pagination.limit,
      totalPage: Math.ceil(totalItem / pagination.limit),
    };
  }

  async listByShop(
    pagination: PaginationQueryType,
    sellerId: number,
  ): Promise<{
    data: any[];
    totalItem: number;
    page: number;
    limmit: number;
    totalPage: number;
  }> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;
    const [data, totalItem] = await Promise.all([
      this.prismaService.template.findMany({
        where: {
          sellerId,
        },
        take,
        skip,
      }),
      this.prismaService.template.count({
        where: {
          sellerId,
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

  findByIdIsPublic(id: number): Promise<any> {
    return this.prismaService.template.findUnique({
      where: {
        id,
        isActive: true,
      },
    });
  }

  findAllByShop(id: number): Promise<any> {
    return this.prismaService.template.findFirst({
      where: {
        sellerId: id,
      },
    });
  }

  create({
    sellerId,
    data,
  }: {
    sellerId: number;
    data: CreateTemplateBodyType;
  }): Promise<any> {
    return this.prismaService.template.create({
      data: {
        ...data,
        sellerId,
      },
    });
  }

  async update({
    id,
    data,
  }: {
    id: number;
    data: UpdateTemplateBodyType;
  }): Promise<any> {
    return this.prismaService.template.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  delete({ id }: { id: number }): Promise<any> {
    return this.prismaService.template.delete({
      where: {
        id,
      },
    });
  }
}
