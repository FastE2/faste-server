import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFlashSaleItemBodyType, UpdateFlashSaleItemBodyType } from './flashsale-item.schema';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
export declare class FlashSaleItemRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(query: PaginationQueryType, flashSaleId: number): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findBySellerById({ id, createdById, }: {
        id: number;
        createdById: number;
    }): Promise<any>;
    createMany({ id, data, createdById, }: {
        id: number;
        createdById: number;
        data: CreateFlashSaleItemBodyType[];
    }): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    update({ id, updatedById, data, }: {
        id: number;
        updatedById: number;
        data: UpdateFlashSaleItemBodyType;
    }): Promise<any>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
