import { Injectable } from '@nestjs/common';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PAYMENT_STATUS } from '../constants/payment.constant';

@Injectable()
export class CommonPaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async cancelPaymentAndOrder(transactionId: number) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        payments: {
          include: {
            order: {
              include: {
                items: true,
              },
            },
          },
        },
      },
    });
    if (!transaction) {
      throw Error('Transaction not found');
    }
    const orders = transaction.payments.map((item) => item.order);
    const payMentIds = transaction.payments.map((item) => item.id);
    const productSKUSnapshots = orders.map((order) => order?.items).flat();
    await this.prismaService.$transaction(async (tx) => {
      const updateOrder$ = tx.order.updateMany({
        where: {
          id: {
            in: orders.map((order) => Number(order!.id)),
          },
          status: OrderStatus.PENDING_PAYMENT,
          deletedAt: null,
        },
        data: {
          status: OrderStatus.CANCELLED,
        },
      });

      const updateSkus$ = Promise.all(
        productSKUSnapshots
          .filter((item) => item!.skuId)
          .map((item) =>
            tx.sKU.update({
              where: {
                id: item!.skuId as number,
              },
              data: {
                quantity: {
                  increment: item!.quantity,
                },
              },
            }),
          ),
      );
      await tx.payment.updateMany({
        where: {
          id: {
            in: payMentIds,
          },
        },
        data: {
          status: PAYMENT_STATUS.FAILED,
        },
      });
      const updateTransaction$ = tx.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          status: PAYMENT_STATUS.FAILED,
        },
      });
      return await Promise.all([updateOrder$, updateSkus$, updateTransaction$]);
    });
  }
}
