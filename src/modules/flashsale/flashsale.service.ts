import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { Prisma } from '@prisma/client';
import { BrandRepository } from './flashsale.repository';
import { CreateBrandBodyType, UpdateBrandBodyType } from './flashsale.schema';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}
  async getAllBrands(query: PaginationQueryType) {
    try {
      return await this.brandRepository.list(query);
    } catch (error) {
      console.log('/brand', error);
      throw error;
    }
  }

  async getBrandById(id: number) {
    try {
      const brand = await this.brandRepository.findById(id);
      if (!brand) {
        throw NotFoundRecordException;
      }
      return brand;
    } catch (error) {
      console.log('/brand/:id', error);
      throw error;
    }
  }

  async createBrand({
    data,
    createdById,
  }: {
    data: CreateBrandBodyType;
    createdById: number;
  }) {
    try {
      const brand = await this.brandRepository.create({ createdById, data });
      return brand;
    } catch (error) {
      console.log('/brand', error);
      throw error;
    }
  }

  async updateBrand({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdateBrandBodyType;
    updatedById: number;
  }) {
    try {
      // update user
      const updatedBrand = await this.brandRepository.update({
        id,
        updatedById,
        data,
      });

      return updatedBrand;
    } catch (error) {
      console.log('/brand/:id', error);
      throw error;
    }
  }

  async deleteBrand({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      //  delete brand (xóa mềm)
      await this.brandRepository.delete({ id, deletedById });

      return { message: 'Delete brand successfully' };
    } catch (error) {
      console.log('/brand/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
