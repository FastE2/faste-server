import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CancelOrderResType,
  CreateOrderBodyType,
  GetOrderListQueryType,
  UpdateOrderBodyType,
} from './order.schema';
import { Prisma } from '@prisma/client';
import { NotFoundRecordException } from 'src/common/errors';
import {
  CannotCancelOrderException,
  NotFoundCartItemException,
  OutOfStockSKUException,
  ProductNotBelongToShopException,
} from './order.error';
import { PAYMENT_STATUS } from 'src/common/constants/payment.constant';
import { ORDER_STATUS } from 'src/common/constants/order.constant';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { OrderProducer } from './order.producer';

type WhereUniqueOrderType =
  | { id: number }
  | { id: number; userId: number }
  | { id: number; shopId: number };

type WhereListOrderType = { userId: number } | { shopId: number };

@Injectable()
export class OrderRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderProducer: OrderProducer,
  ) {}

  async list({
    _where,
    query,
  }: {
    _where: WhereListOrderType;
    query: GetOrderListQueryType;
  }): Promise<any> {
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;
    const take = limit;
    const where: Prisma.OrderWhereInput = {
      ..._where,
      status,
    };

    const [totalItems, data] = await Promise.all([
      this.prismaService.order.count({
        where,
      }),
      this.prismaService.order.findMany({
        where,
        include: {
          items: true,
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);
    return {
      data,
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    };
  }

  async findUniqueOrder(where: WhereUniqueOrderType) {
    const order = await this.prismaService.order.findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        items: true,
      },
    });
    if (!order) {
      throw NotFoundRecordException;
    }
    return order;
  }

  async findUniqueClientById({
    userId,
    orderId,
  }: {
    userId: number;
    orderId: number;
  }): Promise<any> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
        userId,
        deletedAt: null,
      },
      include: {
        items: true,
      },
    });
    if (!order) {
      throw NotFoundRecordException;
    }
    return order;
  }

  async findUniqueShopById({
    userId,
    orderId,
  }: {
    userId: number;
    orderId: number;
  }): Promise<any> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
        shopId: userId,
        deletedAt: null,
      },
      include: {
        items: true,
      },
    });
    if (!order) {
      throw NotFoundRecordException;
    }
    return order;
  }

  async create({
    userId,
    body,
  }: {
    userId: number;
    body: CreateOrderBodyType;
  }): Promise<{
    transaction: any;
    orders: any;
  }> {
    const arrayCartItems = body.map((cartItem) => cartItem.cartItemIds).flat();
    const cartItems = await this.prismaService.cartItem.findMany({
      where: {
        id: {
          in: arrayCartItems,
        },
        userId,
      },
      include: {
        sku: {
          include: {
            product: {
              include: {
                productTranslations: true,
              },
            },
          },
        },
      },
    });

    if (cartItems.length !== arrayCartItems.length) {
      throw NotFoundCartItemException;
    }
    const isOutOfStock = cartItems.some((item) => {
      return item.sku.quantity <= item.quantity;
    });
    if (isOutOfStock) {
      throw OutOfStockSKUException('sku');
    }

    const isExistProduct = cartItems.some((item) => {
      return (
        item.sku.product.deletedAt !== null ||
        item.sku.deletedAt !== null ||
        item.sku.product.publishedAt == null ||
        item.sku.product.publishedAt > new Date()
      );
    });
    if (isExistProduct) {
      throw NotFoundRecordException;
    }

    const mapCartItem = new Map<number, (typeof cartItems)[0]>();
    cartItems.forEach((item) => {
      mapCartItem.set(item.id, item);
    });
    const isValidBodyData = body.every((item) => {
      const bodyCartItemIds = item.cartItemIds;
      return bodyCartItemIds.every((cartItemId: number) => {
        const cartItem = mapCartItem.get(cartItemId);
        return item.shopId === cartItem?.sku.product.shopId;
      });
    });
    if (!isValidBodyData) {
      throw ProductNotBelongToShopException;
    }
    const total = cartItems.reduce((acc, item) => {
      return acc + item.sku.price * item.quantity;
    }, 0);
    const [transaction, orders] = await this.prismaService.$transaction(
      async (tx) => {
        const orders = await Promise.all(
          body.map((item) =>
            tx.order.create({
              data: {
                userId,
                status: ORDER_STATUS.PENDING_PAYMENT,
                addressShipId: item.addressShipId,
                deliveryId: item.deliveryId,
                shopId: item.shopId,
                createdById: userId,
                items: {
                  create: item.cartItemIds.map((cartItemId) => {
                    const cartItem = mapCartItem.get(cartItemId);
                    return {
                      productName: cartItem!.sku.product.name,
                      skuPrice: cartItem!.sku.price,
                      skuAttributes: cartItem!.sku.attributes ?? {},
                      image: cartItem?.sku.image ?? '',
                      quantity: cartItem!.quantity,
                      productId: cartItem!.sku.productId,
                      skuId: cartItem!.skuId,
                      productTranslations:
                        cartItem?.sku.product.productTranslations.map(
                          (translation) => {
                            return {
                              id: translation.id,
                              name: translation.name,
                              description: translation.description,
                              languageId: translation.languageId,
                            };
                          },
                        ) ?? [],
                    };
                  }),
                },
              },
            }),
          ),
        );
        const transaction = await tx.transaction.create({
          data: {
            status: PAYMENT_STATUS.PENDING,
            method: body[0].paymentMethod,
            total,
            userId,
          },
        });

        const payments = await Promise.all(
          orders.map((order) => {
            const orderCartItems = cartItems.filter(
              (i) => i.sku.product.shopId === order.shopId,
            );
            const amount = orderCartItems.reduce(
              (sum, i) => sum + i.sku.price * i.quantity,
              0,
            );

            return tx.payment.create({
              data: {
                transactionId: transaction.id,
                amount,
                status: PAYMENT_STATUS.PENDING,
                userId,
                orderId: order.id,
              },
            });
          }),
        );
        const cartItem$ = tx.cartItem.deleteMany({
          where: {
            id: {
              in: arrayCartItems,
            },
          },
        });
        const sku$ = Promise.all(
          cartItems.map((item) =>
            tx.sKU.update({
              where: {
                id: item.sku.id,
              },
              data: {
                quantity: {
                  decrement: item.quantity,
                },
              },
            }),
          ),
        );
        const updatePaymentOrder$ = await Promise.all(
          payments.map((payment) =>
            tx.order.update({
              where: { id: payment.orderId },
              data: { paymentId: payment.id },
            }),
          ),
        );
        const scheduleCancelPaymentJob$ = this.orderProducer.scheduleCancelJob(
          transaction.id,
        );
        const [_] = await Promise.all([
          cartItem$,
          sku$,
          updatePaymentOrder$,
          scheduleCancelPaymentJob$,
        ]);
        return [transaction, orders];
      },
    );

    return { transaction, orders };
  }

  async cancel(userId: number, orderId: number): Promise<CancelOrderResType> {
    try {
      const order = await this.prismaService.order.findUniqueOrThrow({
        where: {
          id: orderId,
          userId,
          deletedAt: null,
        },
      });
      if (order.status !== ORDER_STATUS.PENDING_PAYMENT) {
        throw CannotCancelOrderException;
      }
      const updatedOrder = await this.prismaService.order.update({
        where: {
          id: orderId,
          userId,
          deletedAt: null,
        },
        data: {
          status: ORDER_STATUS.CANCELLED,
          updatedById: userId,
        },
      });
      return updatedOrder;
    } catch (error) {
      console.log('order/:id', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async update({
    id,
    updatedById,
    body,
  }: {
    id: number;
    updatedById: number;
    body: UpdateOrderBodyType;
  }): Promise<any> {
    return this.prismaService.order.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...body,
        updatedById,
      },
    });
  }

  delete(
    {
      id,
      deletedById,
    }: {
      id: number;
      deletedById: number;
    },
    isHard?: boolean,
  ): Promise<any> {
    return isHard
      ? this.prismaService.order.delete({
          where: {
            id,
          },
        })
      : this.prismaService.order.update({
          where: {
            id,
            deletedAt: null,
          },
          data: {
            deletedAt: new Date(),
            deletedById,
          },
        });
  }
}
