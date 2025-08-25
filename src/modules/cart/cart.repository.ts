import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartBodyType, UpdateCartItemBodyType } from './cart.schema';
import {
  NotFoundRecordException,
  NotFoundRecordSKUException,
} from 'src/common/errors';
import { UnprocessableEntityQuantitySKUInValidException } from './cart.error';
import { PRODUCT_STATUS } from 'src/common/constants/product.constant';

@Injectable()
export class CartRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list({
    userId,
    languageId,
    page,
    limit,
  }: {
    userId: number;
    languageId: string;
    limit: number;
    page: number;
  }): Promise<{
    data: any[];
    totalItem: number;
    page: number;
    limit: number;
    totalPage: number;
  }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const [cartItems, totalItem] = await Promise.all([
      this.prismaService.cartItem.findMany({
        where: {
          userId,
          sku: {
            deletedAt: null,
            product: {
              deletedAt: null,
              publishedAt: {
                lte: new Date(),
                not: null,
              },
            },
          },
        },
        select: {
          id: true,
          quantity: true,
          skuId: true,
          createdAt: true,
          updatedAt: true,
          sku: {
            select: {
              id: true,
              price: true,
              quantity: true,
              attributes: true,
              createdById: true,
              image: true,
              sold: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  basePrice: true,
                  variants: true,
                  images: true,
                  productTranslations: {
                    where: languageId
                      ? { deletedAt: null }
                      : { name: languageId, deletedAt: null },
                    select: {
                      id: true,
                      name: true,
                      description: true,
                      languageId: true,
                    },
                  },
                  createdBy: {
                    select: {
                      id: true,
                      name: true,
                      avatar: true,
                    },
                  },
                },
              },
            },
          },
        },

        // include: {
        //   sku: {
        //     omit: {
        //       deletedAt: true,
        //       deletedById: true,
        //       skuCode: true,
        //     },
        //     include: {
        //       product: {
        //         include: {
        //           productTranslations: {
        //             where: languageId
        //               ? { deletedAt: null }
        //               : { name: languageId, deletedAt: null },
        //           },
        //           createdBy: {
        //             select: {
        //               id: true,
        //               name: true,
        //               avatar: true,
        //             },
        //           },
        //         },
        //         omit: {
        //           deletedAt: true,
        //           deletedById: true,
        //           updatedById: true,
        //         },
        //       },
        //     },
        //   },
        // },
        take,
        skip,
      }),
      this.prismaService.cartItem.count({
        where: {
          userId,
        },
      }),
    ]);

    const gropMapCartItem = new Map<number, (typeof cartItems)[0][]>();
    for (const cartItem of cartItems) {
      const shopId = cartItem.sku.createdById;
      if (!gropMapCartItem.has(shopId)) {
        gropMapCartItem.set(shopId, []);
      }
      gropMapCartItem.get(shopId)?.push(cartItem);
    }

    const cartGroupedByShop = Array.from(gropMapCartItem, ([shopId, items]) => {
      const shop = items[0].sku.product.createdBy;
      const cartItemsWithoutCreatedBy = items.map((item) => {
        const { createdBy, ...productWithoutCreatedBy } = item.sku.product;
        return {
          ...item,
          sku: {
            ...item.sku,
            product: productWithoutCreatedBy,
          },
        };
      });
      return {
        shop,
        cartItems: cartItemsWithoutCreatedBy,
      };
    });

    return {
      data: cartGroupedByShop,
      totalItem,
      page,
      limit,
      totalPage: Math.ceil(totalItem / limit),
    };
  }

  async create(userId: number, body: AddToCartBodyType): Promise<any> {
    await this.validateSKU({
      skuId: body.skuId,
      quantity: body.quantity,
      userId,
      isCreate: true,
    });

    return this.prismaService.cartItem.upsert({
      where: {
        userId_skuId: {
          userId,
          skuId: body.skuId,
        },
      },
      update: {
        quantity: {
          increment: body.quantity,
        },
      },
      create: {
        userId,
        skuId: body.skuId,
        quantity: body.quantity,
      },
    });
  }

  async validateSKU({
    skuId,
    quantity,
    userId,
    isCreate,
  }: {
    skuId: number;
    quantity: number;
    userId: number;
    isCreate: boolean;
  }) {
    const [sku, cartIteam] = await Promise.all([
      this.prismaService.sKU.findUnique({
        where: {
          id: skuId,
        },
        select: {
          product: true,
          quantity: true,
        },
      }),
      this.prismaService.cartItem.findUnique({
        where: {
          userId_skuId: {
            userId,
            skuId,
          },
        },
      }),
    ]);
    if (!sku) {
      throw NotFoundRecordSKUException;
    }

    if (cartIteam && isCreate && quantity + cartIteam.quantity > sku.quantity) {
      throw UnprocessableEntityQuantitySKUInValidException;
    }

    if (sku.quantity < 1 || quantity > sku.quantity) {
      throw UnprocessableEntityQuantitySKUInValidException;
    }

    if (
      sku.product.status !== PRODUCT_STATUS.PUBLISHED ||
      sku.product.deletedAt !== null ||
      sku.product.publishedAt === null ||
      (sku.product.publishedAt !== null && sku.product.publishedAt > new Date())
    ) {
      throw NotFoundRecordException;
    }

    return true;
  }

  async update({
    id,
    userId,
    body,
  }: {
    id: number;
    userId: number;
    body: UpdateCartItemBodyType;
  }): Promise<any> {
    await this.validateSKU({
      skuId: body.skuId,
      quantity: body.quantity,
      userId,
      isCreate: false,
    });

    return this.prismaService.cartItem.update({
      where: {
        id,
        userId,
      },
      data: {
        quantity: body.quantity,
        skuId: body.skuId,
      },
    });
  }

  delete({ id, userId }: { id: number; userId: number }): Promise<any> {
    return this.prismaService.cartItem.delete({
      where: {
        id,
        userId,
      },
    });
  }

  // findById(id: number): Promise<BrandType | null> {
  //   return this.prismaService.brand.findUnique({
  //     where: {
  //       id,
  //       deletedAt: null,
  //     },
  //   });
  // }
}
