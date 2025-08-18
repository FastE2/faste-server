import { Injectable } from '@nestjs/common';
import { LanguageRepository } from './language.repository';
import { GetParamsType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import {
  CreateLanguageBodyType,
  UpdateLanguageBodyType,
} from './language.schema';
import { Prisma } from '@prisma/client';

@Injectable()
export class LanguageService {
  constructor(private readonly languageRepository: LanguageRepository) {}

  async findAll() {
    try {
      return await this.languageRepository.list();
    } catch (error) {
      console.log('/language');
      throw error;
    }
  }

  async findOne(params: GetParamsType) {
    try {
      const language = await this.languageRepository.findById(params.id);
      if (!language) {
        throw NotFoundRecordException;
      }

      return language;
    } catch (error) {
      console.log('/language/:id');
      throw error;
    }
  }
  async create(data: CreateLanguageBodyType, createdById: number) {
    try {
      return await this.languageRepository.create({
        ...data,
        createdById,
      });
    } catch (error) {
      console.log('/language');
      throw error;
    }
  }

  async update(id: number, data: UpdateLanguageBodyType, updatedById: number) {
    try {
      return await this.languageRepository.update({ id, data, updatedById });
    } catch (error) {
      console.log('/language/:id');
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.languageRepository.delete({ id, deletedById });
      return { message: 'Delete language successfully' };
    } catch (error) {
      console.log('/language/:id');
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
