import { ForbiddenException, Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import {
  NotFoundRecordException,
  NotFoundUserException,
} from 'src/common/errors';
import { ShopRepository } from './shop.repository';
import { RegisterShopBodyType, UpdateShopBodyType } from './shop.schema';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { ExistedShopException } from './shop.error';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';

@Injectable()
export class ShopService {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly commonUserRepository: CommonUserRepository,
    private readonly commonRoleRepository: CommonRoleRepository,
  ) {}

  async getAllShops(query: PaginationQueryType) {
    try {
      return await this.shopRepository.findAll(query);
    } catch (error) {
      console.log('/shop', error);
      throw error;
    }
  }

  async getAllShopsIsPublic(query: PaginationQueryType) {
    try {
      return await this.shopRepository.findAllIsPublic(query);
    } catch (error) {
      console.log('/shop/public', error);
      throw error;
    }
  }

  async registerShop(userId: number, body: RegisterShopBodyType) {
    try {
      const existedUser = await this.commonUserRepository.findUniqueUser({
        id: userId,
      });

      if (!existedUser) {
        throw NotFoundUserException;
      }

      const shop = await this.shopRepository.findOne({ id: userId });
      if (shop) {
        throw ExistedShopException;
      }

      return this.shopRepository.create({ userId, data: body });
    } catch (error) {
      console.log('shop/register', error);
      throw error;
    }
  }

  async getShopById(id: number) {
    try {
      const shop = await this.shopRepository.findOne({ id });
      if (!shop) {
        throw NotFoundRecordException;
      }
      return shop;
    } catch (error) {
      console.log('/shop/:id', error);
      throw error;
    }
  }

  async getShopBySlug(slug: string) {
    try {
      const shop = await this.shopRepository.findOne({ slug });
      if (!shop) {
        throw NotFoundRecordException;
      }
      return shop;
    } catch (error) {
      console.log('/shop/:slug', error);
      throw error;
    }
  }

  async updateShop({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdateShopBodyType;
    updatedById: number;
  }) {
    try {
      // update shop
      const user = await this.commonUserRepository.findUniqueUser({
        id: updatedById,
      });
      const roleAdminId = await this.commonRoleRepository.getAdminRoleId();
      const roleSellerId = await this.commonRoleRepository.getSellerRoleId();
      if (
        (id !== updatedById || user?.roleId !== roleSellerId) &&
        user?.roleId !== roleAdminId
      ) {
        throw new ForbiddenException();
      }
      const updatedShop = await this.shopRepository.update({
        id,
        updatedById,
        data,
      });

      return updatedShop;
    } catch (error) {
      console.log('/shop/:id', error);
      throw error;
    }
  }

  async deleteShop({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      const user = await this.commonUserRepository.findUniqueUser({
        id: deletedById,
      });
      const roleAdminId = await this.commonRoleRepository.getAdminRoleId();
      const roleSellerId = await this.commonRoleRepository.getSellerRoleId();
      if (
        (id !== deletedById || user?.roleId !== roleSellerId) &&
        user?.roleId !== roleAdminId
      ) {
        throw new ForbiddenException();
      }
      //  delete shop (xóa mềm)
      await this.shopRepository.delete({ id, deletedById });

      return { message: 'Delete shop successfully' };
    } catch (error) {
      console.log('/shop/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
