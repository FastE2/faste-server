import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';
import { CreateWidgetBodyType, UpdateWidgetBodyType } from './widget.schema';
import { WidgetRepository } from './widget.repository';

@Injectable()
export class WidgetService {
  constructor(private readonly widgetRepository: WidgetRepository) {}
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
      console.log('/brand', error);
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

  async deleteWidget({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.widgetRepository.delete({ id });

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
