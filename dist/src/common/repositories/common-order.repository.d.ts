import { PrismaService } from 'src/prisma/prisma.service';
export declare class CommonOrderRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findUniqueOrder(orderId: number): Promise<any>;
}
