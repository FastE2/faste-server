import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';
import {
  CreateWidgetBodyType,
  UpdateManyWidgetsType,
  UpdateWidgetBodyType,
} from './widget.schema';
import { WidgetRepository } from './widget.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WidgetService {
  constructor(
    private readonly widgetRepository: WidgetRepository,
    private readonly prismaService: PrismaService,
  ) {}
  async getAllWidgetsByTemplate(templateId: number, userId: number) {
    try {
      return await this.widgetRepository.listByShopInTemplate(templateId);
    } catch (error) {
      console.log('/widget', error);
      throw error;
    }
  }

  async getAllWidgetsByTemplateIsPublic(templateId: number) {
    try {
      return await this.widgetRepository.listByShopInTemplateIsPublic(
        templateId,
      );
    } catch (error) {
      console.log('/widget', error);
      throw error;
    }
  }

  async getWidgetId(id: number) {
    try {
      const template = await this.widgetRepository.findById(id);
      if (!template) {
        throw NotFoundRecordException;
      }
      return template;
    } catch (error) {
      console.log('/widget/:id', error);
      throw error;
    }
  }

  async createWidget({
    data,
    createdById,
  }: {
    data: CreateWidgetBodyType;
    createdById: number;
  }) {
    try {
      const brand = await this.widgetRepository.create({
        sellerId: createdById,
        data,
      });
      return brand;
    } catch (error) {
      console.log('/widget', error);
      throw error;
    }
  }

  async updateWidget({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdateWidgetBodyType;
    updatedById: number;
  }) {
    try {
      const updatedWidget = await this.widgetRepository.update({
        id,
        data,
      });

      return updatedWidget;
    } catch (error) {
      console.log('/widget/:id', error);
      throw error;
    }
  }

  async updateWidgets(templateId: number, data: UpdateManyWidgetsType) {
    const { widgets: newWidgets } = data;
    return this.prismaService.$transaction(async (tx) => {
      const oldWidgets = await tx.widget.findMany({
        where: {
          templateId,
        },
        select: {
          id: true,
          widgetIndex: true,
          viewConfig: true,
          type: true,
          name: true,
          isVisible: true,
        },
        orderBy: { widgetIndex: 'asc' },
      });

      const updates: Prisma.PrismaPromise<any>[] = [];

      for (const newW of newWidgets) {
        const oldW = oldWidgets.find((w) => w.id === newW.id);
        if (!oldW) continue;

        const isChanged =
          oldW.widgetIndex !== newW.widgetIndex ||
          oldW.name !== newW.name ||
          oldW.type !== newW.type ||
          oldW.isVisible !== newW.isVisible ||
          JSON.stringify(oldW.viewConfig) !== JSON.stringify(newW.viewConfig);

        if (isChanged) {
          updates.push(
            tx.widget.update({
              where: { id: newW.id },
              data: {
                widgetIndex: newW.widgetIndex,
                name: newW.name,
                type: newW.type,
                viewConfig: newW.viewConfig,
                isVisible: newW.isVisible,
              },
            }),
          );
        }
      }

      if (updates.length === 0) {
        return { message: 'No changes detected' };
      }

      await Promise.all(updates);

      return {
        message: 'Widgets updated successfully',
        updated: updates.length,
      };
    });
  }

  async deleteWidget({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      const deleted = await this.widgetRepository.findById(id);
      if (!deleted) throw new Error('Widget not found');

      const deletedIndex = deleted.widgetIndex;

      await this.widgetRepository.delete({ id });

      await this.prismaService.widget.updateMany({
        where: {
          widgetIndex: { gt: deletedIndex },
          templateId: deleted.templateId,
        },
        data: {
          widgetIndex: { decrement: 1 },
        },
      });

      return { message: 'Delete widget successfully' };
    } catch (error) {
      console.log('/widget/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
