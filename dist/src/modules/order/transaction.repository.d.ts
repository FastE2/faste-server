import { PrismaService } from 'src/prisma/prisma.service';
export declare class TransactionRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findUniqueClientById({ userId, transactionId, }: {
        userId: number;
        transactionId: number;
    }): Promise<any>;
}
