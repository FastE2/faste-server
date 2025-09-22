import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type WhereUniqueSKUType =
  | { id: number; createdById }
  | { productId: number; createdById };

@Injectable()
export class CommonSKURepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUniqueSKU(where: WhereUniqueSKUType): Promise<any> {
    return this.prismaService.sKU.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        product: true,
      },
    });
  }
  async findManySKU({
    ids,
    createdById,
  }: {
    ids: number[];
    createdById: number;
  }): Promise<any> {
    return this.prismaService.sKU.findMany({
      where: {
        id: { in: ids },
        createdById,
      },
      include: {
        product: true,
      },
    });
  }
}
