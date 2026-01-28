import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRating } from '../types/product';
export declare class CommonProductRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findOneUniquePublic(uniqueValue: {
        id: number;
    } | {
        slugId: string;
    }): Promise<any>;
    updateRating({ id, data, }: {
        id: number;
        data: ProductRating;
    }): Promise<any>;
}
