import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { AddressShipRepository } from './address-ship.repository';
import {
  CreateAddressShipBodyType,
  UpdateAddressShipBodyType,
} from './address-ship.schema';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';

@Injectable()
export class AddressShipService {
  constructor(private readonly addressShipRepository: AddressShipRepository) {}
  async getAllAddressShips(userId: number, query: PaginationQueryType) {
    try {
      return await this.addressShipRepository.list(userId, query);
    } catch (error) {
      console.log('/address-ship', error);
      throw error;
    }
  }

  async getAddressShipById(userId: number, id: number) {
    try {
      const addressShip = await this.addressShipRepository.findById(userId, id);
      if (!addressShip) {
        throw NotFoundRecordException;
      }
      return addressShip;
    } catch (error) {
      console.log('/address-ship/:id', error);
      throw error;
    }
  }

  async createAddressShip({
    data,
    userId,
  }: {
    data: CreateAddressShipBodyType;
    userId: number;
  }) {
    try {
      const addressShip = await this.addressShipRepository.create({
        userId,
        data,
      });
      return addressShip;
    } catch (error) {
      console.log('/address-ship', error);
      throw error;
    }
  }

  async updateAddressShip({
    id,
    data,
    userId,
  }: {
    id: number;
    data: UpdateAddressShipBodyType;
    userId: number;
  }) {
    try {
      // update user
      const updatedAddressShip = await this.addressShipRepository.update({
        id,
        userId,
        data,
      });

      return updatedAddressShip;
    } catch (error) {
      console.log('/address-ship/:id', error);
      throw error;
    }
  }

  async deleteAddressShip({ id, userId }: { id: number; userId: number }) {
    try {
      //  delete addressShip (xóa mềm)
      await this.addressShipRepository.delete({ id, userId });

      return { message: 'Delete addressShip successfully' };
    } catch (error) {
      console.log('/address-ship/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
