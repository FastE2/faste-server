import { PrismaService } from 'src/prisma/prisma.service';
export declare class CommonPaymentRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    cancelPaymentAndOrder(transactionId: number): Promise<void>;
}
