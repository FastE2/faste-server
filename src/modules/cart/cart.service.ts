import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { Prisma } from '@prisma/client';
import { CartRepository } from './cart.repository';
import { AddToCartBodyType, UpdateCartItemBodyType } from './cart.schema';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}
  async getCarts(userId: number, query: PaginationQueryType) {
    try {
      return await this.cartRepository.list({
        languageId: '',
        userId,
        limit: query.limit,
        page: query.page,
      });
    } catch (error) {
      console.log('/cart', error);
      throw error;
    }
  }

  async create(userId: number, body: AddToCartBodyType) {
    try {
      return await this.cartRepository.create(userId, body);
    } catch (error) {
      console.log('/cart', error);
      throw error;
    }
  }

  async update({
    id,
    userId,
    body,
  }: {
    id: number;
    userId: number;
    body: UpdateCartItemBodyType;
  }) {
    try {
      const updatedCart = await this.cartRepository.update({
        id,
        userId,
        body,
      });

      return updatedCart;
    } catch (error) {
      console.log('/cart/:id', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async delete({ id, userId }: { id: number; userId: number }) {
    try {
      //  delete brand (xóa cứng)
      await this.cartRepository.delete({ id, userId });

      return { message: 'Delete brand successfully' };
    } catch (error) {
      console.log('/cart/:id', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  // async getBrandById(id: number) {
  //   try {
  //     const brand = await this.cartRepository.findById(id);
  //     if (!brand) {
  //       throw NotFoundRecordException;
  //     }
  //     return brand;
  //   } catch (error) {
  //     console.log('/brand/:id', error);
  //     throw error;
  //   }
  // }
}
