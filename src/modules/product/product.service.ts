import { ForbiddenException, Injectable } from '@nestjs/common';
import { NotFoundRecordException } from 'src/common/errors';
import { Prisma } from '@prisma/client';
import {
  CreateProductBodyType,
  CreateProductInDBBodyType,
  GetProductsQueryType,
} from './product.schema';
import { ProductRepository } from './product.repository';
import { ROLE_NAME } from 'src/common/constants/role-base.constant';
import { buildSkuCode } from '../../common/helpers/generate-skus.helper';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async findAllPublic(query: GetProductsQueryType) {
    try {
      return await this.productRepository.findAllPublic(query);
    } catch (error) {
      console.log('/products/public', error);
      throw error;
    }
  }

  async findAllPublicByShop(query: GetProductsQueryType, id: number) {
    try {
      return await this.productRepository.findAllPublicByShop(query, id);
    } catch (error) {
      console.log('/products/public/shop/:id', error);
      throw error;
    }
  }

  async findByIdPublic(id: number) {
    try {
      const product = await this.productRepository.findOneUniquePublic({ id });
      if (!product) {
        throw NotFoundRecordException;
      }
      return product;
    } catch (error) {
      console.log('/product/public', error);
      throw error;
    }
  }

  async findBySlugIdPublic(slugId: string) {
    try {
      const product = await this.productRepository.findOneUniquePublic({
        slugId,
      });
      if (!product) {
        throw NotFoundRecordException;
      }
      return product;
    } catch (error) {
      console.log('/product/public', error);
      throw error;
    }
  }

  async findAll({
    query,
    userId,
    roleName,
  }: {
    query: GetProductsQueryType;
    userId: number;
    roleName: string;
  }) {
    try {
      const where: Prisma.ProductWhereInput = { deletedAt: null };
      if (roleName === ROLE_NAME.SELLER) {
        where.shopId = userId;
      } else if (
        roleName !== ROLE_NAME.ADMIN &&
        roleName !== ROLE_NAME.SELLER
      ) {
        throw new ForbiddenException();
      }
      return await this.productRepository.findAll({ pagination: query, where });
    } catch (error) {
      console.log('/products', error);
      throw error;
    }
  }

  async findById({
    id,
    userId,
    roleName,
  }: {
    id: number;
    userId: number;
    roleName: string;
  }) {
    try {
      const where: Prisma.ProductWhereInput = { id, deletedAt: null };
      if (roleName === ROLE_NAME.SELLER) {
        where.shopId = userId;
      }

      const product = await this.productRepository.findById(where);
      if (!product) {
        throw NotFoundRecordException;
      }
      this.validatePrivilege({
        userIdRequest: userId,
        roleNameRequest: roleName,
        createdById: product.shopId,
      });
      return product;
    } catch (error) {
      console.log('/products/:id', error);
      throw error;
    }
  }

  async create({
    data,
    createdById,
    roleName,
  }: {
    data: CreateProductBodyType;
    createdById: number;
    roleName: string;
  }) {
    try {
      if (roleName !== ROLE_NAME.ADMIN && roleName !== ROLE_NAME.SELLER) {
        throw new ForbiddenException();
      }
      const { skus, ...productData } = data;
      const newSkus = skus.map((sku) => {
        const skuCode = buildSkuCode(sku.attributes);

        return {
          ...sku,
          skuCode,
        };
      });

      const product = await this.productRepository.create({
        createdById,
        data: {
          ...productData,
          skus: newSkus,
        },
      });
      return product;
    } catch (error) {
      console.log('/products', error);
      throw error;
    }
  }

  async update({
    id,
    data,
    updatedById,
    roleName,
  }: {
    id: number;
    data: CreateProductInDBBodyType;
    updatedById: number;
    roleName: string;
  }) {
    const product = await this.productRepository.findById({
      id,
      deletedAt: null,
    });
    if (!product) {
      throw NotFoundRecordException;
    }
    this.validatePrivilege({
      userIdRequest: updatedById,
      createdById: product.shopId,
      roleNameRequest: roleName,
    });
    try {
      // update user
      const newSkus = data.skus.map((sku) => {
        if (!sku.skuCode) {
          sku.skuCode = buildSkuCode(sku.attributes);
        }

        return {
          ...sku,
        };
      });
      data.skus = newSkus;
      const updatedCategory = await this.productRepository.update({
        id,
        updatedById,
        data,
      });

      return updatedCategory;
    } catch (error) {
      console.log('/products/:id', error);
      throw error;
    }
  }

  async delete({
    id,
    deletedById,
    roleName,
  }: {
    id: number;
    deletedById: number;
    roleName: string;
  }) {
    const product = await this.productRepository.findById({
      id,
      deletedAt: null,
    });
    if (!product) {
      throw NotFoundRecordException;
    }
    this.validatePrivilege({
      userIdRequest: deletedById,
      createdById: product.shopId,
      roleNameRequest: roleName,
    });
    try {
      //  delete category (xóa mềm)
      await this.productRepository.delete({ id, deletedById });

      return { message: 'Delete product successfully' };
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

  validatePrivilege({
    userIdRequest,
    roleNameRequest,
    createdById,
  }: {
    userIdRequest: number;
    roleNameRequest: string;
    createdById: number | undefined | null;
  }) {
    if (userIdRequest !== createdById && roleNameRequest !== ROLE_NAME.ADMIN) {
      throw new ForbiddenException();
    }
    return true;
  }
}
