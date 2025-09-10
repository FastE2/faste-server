import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { DeliveryTypeRepository } from './delivery-type.repository';
import {
  CreateDeliveryTypeBodyType,
  UpdateDeliveryTypeBodyType,
} from './delivery-type.schema';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';

@Injectable()
export class DeliveryTypeService {
  constructor(
    private readonly deliveryTypeRepository: DeliveryTypeRepository,
  ) {}
  async getAllDeliveryTypes(query: PaginationQueryType) {
    try {
      return await this.deliveryTypeRepository.list(query);
    } catch (error) {
      console.log('/delivery-type', error);
      throw error;
    }
  }

  async getDeliveryTypeById(id: number) {
    try {
      const deliveryType = await this.deliveryTypeRepository.findById(id);
      if (!deliveryType) {
        throw NotFoundRecordException;
      }
      return deliveryType;
    } catch (error) {
      console.log('/delivery-type/:id', error);
      throw error;
    }
  }

  async createDeliveryType({
    data,
    createdById,
  }: {
    data: CreateDeliveryTypeBodyType;
    createdById: number;
  }) {
    try {
      const deliveryType = await this.deliveryTypeRepository.create({
        createdById,
        data,
      });
      return deliveryType;
    } catch (error) {
      console.log('/delivery-type', error);
      throw error;
    }
  }

  async updateDeliveryType({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdateDeliveryTypeBodyType;
    updatedById: number;
  }) {
    try {
      // update user
      const updatedDeliveryType = await this.deliveryTypeRepository.update({
        id,
        updatedById,
        data,
      });

      return updatedDeliveryType;
    } catch (error) {
      console.log('/delivery-type/:id', error);
      throw error;
    }
  }

  async deleteDeliveryType({
    id,
    deletedById,
  }: {
    id: number;
    deletedById: number;
  }) {
    try {
      //  delete deliveryType (xóa mềm)
      await this.deliveryTypeRepository.delete({ id, deletedById });

      return { message: 'Delete delivery type successfully' };
    } catch (error) {
      console.log('/delivery-type/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
