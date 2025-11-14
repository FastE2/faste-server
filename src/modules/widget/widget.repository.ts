import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWidgetBodyType, UpdateWidgetBodyType } from './widget.schema';

@Injectable()
export class WidgetRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async listByShopInTemplate(templateId: number): Promise<any[]> {
    return this.prismaService.widget.findMany({
      where: {
        templateId,
      },
    });
  }

  listByShopInTemplateIsPublic(templateId: number): Promise<any> {
    return this.prismaService.widget.findMany({
      where: {
        templateId,
        isVisible: true,
      },
    });
  }

  findById(id: number): Promise<any> {
    return this.prismaService.widget.findUnique({
      where: {
        id,
      },
    });
  }

  create({
    sellerId,
    data,
  }: {
    sellerId: number;
    data: CreateWidgetBodyType;
  }): Promise<any> {
    return this.prismaService.widget.create({
      data: {
        ...data,
      },
    });
  }

  async update({
    id,
    data,
  }: {
    id: number;
    data: UpdateWidgetBodyType;
  }): Promise<any> {
    const { name, ...rest } = data as any;
    const updateData: any = { ...rest };
    if (name !== undefined) {
      if (name !== null) {
        updateData.name = name;
      }
    }

    return this.prismaService.template.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  delete({ id }: { id: number }): Promise<any> {
    return this.prismaService.widget.delete({
      where: {
        id,
      },
    });
  }
}
