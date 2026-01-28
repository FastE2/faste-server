import { PrismaService } from 'src/prisma/prisma.service';
import { FlashSaleStatus } from 'src/common/constants/flash-sale.constant';
import { FlashSaleListQueryType, CreateFlashSaleBodyType, UpdateFlashSaleBodyType } from './flashsale.schema';
export declare class FlashSaleRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(query: FlashSaleListQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findById(id: number): Promise<any>;
    findBySellerById({ id, createdById, }: {
        id: number;
        createdById: number;
    }): Promise<any>;
    create({ createdById, data, }: {
        createdById: number;
        data: Omit<CreateFlashSaleBodyType, 'isDraft'> & {
            status: FlashSaleStatus;
        };
    }): Promise<any>;
    update({ id, updatedById, data, }: {
        id: number;
        updatedById: number;
        data: Omit<UpdateFlashSaleBodyType, 'isDraft'> & {
            status?: FlashSaleStatus;
        };
    }): Promise<any>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
