import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { Prisma } from '@prisma/client';
import { CategoryRepository } from './category.repository';
import {
  CreateCategoryBodyType,
  UpdateCategoryBodyType,
} from './category.schema';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async getAllCategorys(query: PaginationQueryType) {
    try {
      return await this.categoryRepository.list(query);
    } catch (error) {
      console.log('/category', error);
      throw error;
    }
  }

  async getCategoryById(id: number) {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        throw NotFoundRecordException;
      }
      return category;
    } catch (error) {
      console.log('/category/:id', error);
      throw error;
    }
  }

  async createCategory({
    data,
    createdById,
  }: {
    data: CreateCategoryBodyType;
    createdById: number;
  }) {
    try {
      const category = await this.categoryRepository.create({
        createdById,
        data,
      });
      return category;
    } catch (error) {
      console.log('/category', error);
      throw error;
    }
  }

  async updateRole({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdateCategoryBodyType;
    updatedById: number;
  }) {
    try {
      // update user
      const updatedCategory = await this.categoryRepository.update({
        id,
        updatedById,
        data,
      });

      return updatedCategory;
    } catch (error) {
      console.log('/category/:id', error);
      throw error;
    }
  }

  async deleteCategory({
    id,
    deletedById,
  }: {
    id: number;
    deletedById: number;
  }) {
    try {
      //  delete category (xóa mềm)
      await this.categoryRepository.delete({ id, deletedById });

      return { message: 'Delete category successfully' };
    } catch (error) {
      console.log('/category/:id', error);
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
