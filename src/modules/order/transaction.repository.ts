import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundRecordException } from 'src/common/errors';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUniqueClientById({
    userId,
    transactionId,
  }: {
    userId: number;
    transactionId: number;
  }): Promise<any> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id: transactionId,
        userId,
        status: 'PENDING',
      },
      include: {
        payments: {
          select: {
            id: true,
            amount: true,
            order: true,
            orderId: true,
            createdAt: true,
            status: true,
            paidAt: true,
          },
        },
      },
    });
    if (!transaction) {
      throw NotFoundRecordException;
    }
    return transaction;
  }
}
