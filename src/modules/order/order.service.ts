import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  NotFoundRecordException,
  NotFoundUserException,
} from 'src/common/errors';
import { Prisma } from '@prisma/client';
import { CreateOrderBodyType, GetOrderListQueryType } from './order.schema';
import { OrderRepository } from './order.repository';
import { ROLE_NAME } from 'src/common/constants/role-base.constant';
import {
  ALLOWED_STATUS_BY_ROLE,
  ALLOWED_STATUS_TRANSITIONS,
  OrderStatusType,
} from 'src/common/constants/order.constant';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly commonUserRepository: CommonUserRepository,
  ) {}
  async getOrdersByUser({
    userId,
    query,
  }: {
    userId: number;
    query: GetOrderListQueryType;
  }) {
    try {
      return await this.orderRepository.list({ _where: { userId }, query });
    } catch (error) {
      console.log('/order', error);
      throw error;
    }
  }

  async getOrdersBySeller({
    userId,
    query,
  }: {
    userId: number;
    query: GetOrderListQueryType;
  }) {
    try {
      return await this.orderRepository.list({
        _where: { shopId: userId },
        query,
      });
    } catch (error) {
      console.log('/order/seller', error);
      throw error;
    }
  }

  async cancelOrder({ userId, id }: { userId: number; id: number }) {
    try {
      await this.orderRepository.cancel(userId, id);
      return {
        message: 'Cancel order successfully',
      };
    } catch (error) {
      console.log('/order/cancel/:id', error);
      throw error;
    }
  }

  async getOrderDetailByUser({ userId, id }: { userId: number; id: number }) {
    try {
      const order = await this.orderRepository.findUniqueClientById({
        orderId: id,
        userId,
      });
      if (!order) {
        throw NotFoundRecordException;
      }
      return order;
    } catch (error) {
      console.log('/order/:id', error);
      throw error;
    }
  }

  async getTransactionDetailByUser({
    userId,
    id,
  }: {
    userId: number;
    id: number;
  }) {
    try {
      const transaction = await this.transactionRepository.findUniqueClientById(
        {
          transactionId: id,
          userId,
        },
      );
      if (!transaction) {
        throw NotFoundRecordException;
      }
      return transaction;
    } catch (error) {
      console.log('/tx/:id', error);
      throw error;
    }
  }

  async createOrder({
    body,
    userId,
  }: {
    body: CreateOrderBodyType;
    userId: number;
  }) {
    try {
      const order = await this.orderRepository.create({ userId, body });
      return order;
    } catch (error) {
      console.log('/order', error);
      throw error;
    }
  }

  async updateOrderStatus({
    orderId,
    status,
    userId,
    roleName,
  }: {
    orderId: number;
    status: OrderStatusType;
    userId: number;
    roleName: string;
  }) {
    const allowedStatuses = ALLOWED_STATUS_BY_ROLE[roleName];
    if (!allowedStatuses.includes(status)) {
      throw new ForbiddenException(
        `Role ${roleName} cannot set status ${status}`,
      );
    }

    const filter: any = { id: orderId };
    if (roleName === ROLE_NAME.CLIENT) filter.userId = userId;
    if (roleName === ROLE_NAME.SELLER) filter.shopId = userId;

    const order = await this.orderRepository.findUniqueOrder(filter);

    if (!order) {
      throw NotFoundRecordException;
    }

    const currentStatus = order.status;
    const nextStatus = status;

    const allowedNextStatuses = ALLOWED_STATUS_TRANSITIONS[currentStatus];

    if (!allowedNextStatuses || !allowedNextStatuses.includes(nextStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${nextStatus}.`,
      );
    }

    return this.orderRepository.update({
      id: orderId,
      body: { status },
      updatedById: userId,
    });
  }

  // async updateRole({
  //   id,
  //   data,
  //   updatedById,
  // }: {
  //   id: number;
  //   data: any;
  //   updatedById: number;
  // }) {
  //   try {
  //     // update user
  //     const updatedBrand = await this.orderRepository.update({
  //       id,
  //       updatedById,
  //       data,
  //     });

  //     return updatedBrand;
  //   } catch (error) {
  //     console.log('/brand/:id', error);
  //     throw error;
  //   }
  // }

  async deleteOrder({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      const user = await this.commonUserRepository.findUniqueUserIncludeRole({
        id,
      });
      if (!user) {
        throw NotFoundUserException;
      }
      if (user.role.name !== ROLE_NAME.ADMIN) {
        throw new ForbiddenException();
      }
      //  delete order (xóa mềm)
      await this.orderRepository.delete({ id, deletedById });

      return { message: 'Delete order successfully' };
    } catch (error) {
      console.log('/order/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
