import { PrismaService } from 'src/prisma/prisma.service';
export type WhereUniqueSKUType = {
    id: number;
    createdById: any;
} | {
    productId: number;
    createdById: any;
};
export declare class CommonSKURepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findUniqueSKU(where: WhereUniqueSKUType): Promise<any>;
    findManySKU({ ids, createdById, }: {
        ids: number[];
        createdById: number;
    }): Promise<any>;
}
