import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommonOrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUniqueOrder(orderId: number): Promise<any> {
    return this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: true,
      },
    });
  }
  // async findManySKU({
  //   ids,
  //   createdById,
  // }: {
  //   ids: number[];
  //   createdById: number;
  // }): Promise<any> {
  //   return this.prismaService.sKU.findMany({
  //     where: {
  //       id: { in: ids },
  //       shopId: createdById,
  //     },
  //     include: {
  //       product: true,
  //     },
  //   });
  // }
}
