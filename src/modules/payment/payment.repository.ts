import { BadRequestException, Injectable } from '@nestjs/common';
import { parse } from 'date-fns';
import {
  PAYMENT_STATUS,
  PaymentStatus,
} from 'src/common/constants/payment.constant';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookPaymentBodyType } from 'src/modules/payment/payment.schema';
import { ORDER_STATUS } from 'src/common/constants/order.constant';
import { PREFIX_PAYMENT_CODE } from 'src/common/constants/product.constant';
import { PaymentProducer } from './payment.producer';

@Injectable()
export class PaymentRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paymentProducer: PaymentProducer,
  ) {}

  private getTotalPrice(orders: any[]): number {
    return orders.reduce((total, order) => {
      const orderTotal = order.items.reduce((totalPrice, productSku) => {
        return totalPrice + productSku.skuPrice * productSku.quantity;
      }, 0);
      return total + orderTotal;
    }, 0);
  }

  async receiver(body: WebhookPaymentBodyType): Promise<number> {
    // 1. Thêm thông tin giao dịch vào DB
    // Tham khảo: https://docs.sepay.vn/lap-trinh-webhooks.html
    let amountIn = 0;
    let amountOut = 0;
    if (body.transferType === 'in') {
      amountIn = body.transferAmount;
    } else if (body.transferType === 'out') {
      amountOut = body.transferAmount;
    }
    const paymentTransaction =
      await this.prismaService.paymentTransaction.findUnique({
        where: {
          id: body.id,
        },
      });
    if (paymentTransaction) {
      throw new BadRequestException('Transaction already exists');
    }
    const userId = await this.prismaService.$transaction(async (tx) => {
      await tx.paymentTransaction.create({
        data: {
          id: body.id,
          gateway: body.gateway,
          transactionDate: parse(
            body.transactionDate,
            'yyyy-MM-dd HH:mm:ss',
            new Date(),
          ),
          accountNumber: body.accountNumber!,
          subAccount: body.subAccount!,
          amountIn,
          amountOut,
          accumulated: body.accumulated,
          code: body.code!,
          transactionContent: body.content!,
          referenceNumber: body.referenceCode!,
          body: body.description,
        },
      });

      // 2. Kiểm tra nội dung chuyển khoản và tổng số tiền có khớp hay không
      const transactionId = body.code
        ? Number(body.code.split(PREFIX_PAYMENT_CODE)[1])
        : Number(body.content?.split(PREFIX_PAYMENT_CODE)[1]);
      if (isNaN(transactionId)) {
        throw new BadRequestException('Cannot get payment id from content');
      }

      const transaction = await tx.transaction.findUnique({
        where: {
          id: transactionId,
        },
        include: {
          payments: {
            include: {
              order: true,
            },
          },
        },
      });
      if (!transaction) {
        throw new BadRequestException(
          `Cannot find transaction with id ${transaction}`,
        );
      }
      const payMentIds = transaction.payments.map((item) => item.id);
      const userId = transaction.userId;
      const orders = transaction.payments.map((item) => ({ ...item.order }));
      const totalPrice = this.getTotalPrice(orders);
      if (totalPrice !== body.transferAmount) {
        throw new BadRequestException(
          `Price not match, expected ${totalPrice} but got ${body.transferAmount}`,
        );
      }

      // 3. Cập nhật trạng thái đơn hàng
      await Promise.all([
        tx.transaction.update({
          where: {
            id: transactionId,
          },
          data: {
            status: PAYMENT_STATUS.SUCCESS,
          },
        }),
        tx.payment.updateMany({
          where: {
            id: {
              in: payMentIds,
            },
          },
          data: {
            status: PAYMENT_STATUS.SUCCESS,
          },
        }),
        tx.order.updateMany({
          where: {
            id: {
              in: orders.map((order) => order.id!),
            },
          },
          data: {
            status: ORDER_STATUS.PENDING_PICKUP,
          },
        }),
        this.paymentProducer.removeJob(transactionId),
      ]);
      return userId;
    });

    return userId;
  }
}
