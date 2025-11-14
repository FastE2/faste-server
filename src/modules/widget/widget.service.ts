import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';
import {
  CreateTemplateBodyType,
  UpdateTemplateBodyType,
} from './widget.schema';
import { TemplateRepository } from './widget.repository';

@Injectable()
export class TemplateService {
  constructor(private readonly templateRepository: TemplateRepository) {}
  async getAllTemplates(query: PaginationQueryType) {
    try {
      return await this.templateRepository.list(query);
    } catch (error) {
      console.log('/template', error);
      throw error;
    }
  }

  async getAllTemplatesByShop(query: PaginationQueryType, sellerId: number) {
    try {
      return await this.templateRepository.listByShop(query, sellerId);
    } catch (error) {
      console.log('/template', error);
      throw error;
    }
  }

  async getTemplateIdIsPublic(id: number) {
    try {
      const template = await this.templateRepository.findByIdIsPublic(id);
      if (!template) {
        throw NotFoundRecordException;
      }
      return template;
    } catch (error) {
      console.log('/template/:id', error);
      throw error;
    }
  }

  async createTemplate({
    data,
    createdById,
  }: {
    data: CreateTemplateBodyType;
    createdById: number;
  }) {
    try {
      const brand = await this.templateRepository.create({
        sellerId: createdById,
        data,
      });
      return brand;
    } catch (error) {
      console.log('/brand', error);
      throw error;
    }
  }

  async updateTemplate({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdateTemplateBodyType;
    updatedById: number;
  }) {
    try {
      const updatedTemplate = await this.templateRepository.update({
        id,
        data,
      });

      return updatedTemplate;
    } catch (error) {
      console.log('/template/:id', error);
      throw error;
    }
  }

  async deleteTemplate({
    id,
    deletedById,
  }: {
    id: number;
    deletedById: number;
  }) {
    try {
      //  delete brand (xóa mềm)
      await this.templateRepository.delete({ id });

      return { message: 'Delete template successfully' };
    } catch (error) {
      console.log('/template/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
