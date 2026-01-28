import { CreateFlashSaleBodyType, FlashSaleListQueryType, UpdateFlashSaleBodyType } from '../flashsale.schema';
import { FlashSaleRepository } from '../flashsale.repository';
import { UpdatableFlashSaleStatus } from 'src/common/constants/flash-sale.constant';
import { FlashSaleService } from '../flashsale.service';
import { CreateFlashSaleItemBodyType, UpdateFlashSaleItemBodyType } from '../flashsale-item.schema';
import { FlashSaleItemRepository } from '../flashsale-item.repository';
import { CommonSKURepository } from 'src/common/repositories/common-sku.repository';
export declare class FlashsaleSellerService {
    private readonly flashSaleRepository;
    private readonly flashSaleItemRepository;
    private readonly commonSKURepository;
    private readonly flashSaleService;
    constructor(flashSaleRepository: FlashSaleRepository, flashSaleItemRepository: FlashSaleItemRepository, commonSKURepository: CommonSKURepository, flashSaleService: FlashSaleService);
    getAllFlashSales(query: FlashSaleListQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getOneBySeller({ id, createdById, }: {
        id: number;
        createdById: number;
    }): Promise<any>;
    createFlashsale({ data, createdById, }: {
        data: Omit<CreateFlashSaleBodyType, 'type'>;
        createdById: number;
    }): Promise<any>;
    updateFlashSale({ id, data, updatedById, }: {
        id: number;
        data: Omit<UpdateFlashSaleBodyType, 'type'>;
        updatedById: number;
    }): Promise<any>;
    updateFlashSaleStatus({ id, status, updatedById, }: {
        id: number;
        status: UpdatableFlashSaleStatus;
        updatedById: number;
    }): Promise<any>;
    addItem({ id, data, createdById, }: {
        id: number;
        data: CreateFlashSaleItemBodyType[];
        createdById: number;
    }): Promise<import(".prisma/client").Prisma.BatchPayload>;
    private getValidFlashSaleOrThrow;
    updateItem({ id, itemId, data, updatedById, }: {
        id: number;
        itemId: number;
        data: UpdateFlashSaleItemBodyType;
        updatedById: number;
    }): Promise<any>;
    deleteItem({ id, itemId, deletedById, }: {
        id: number;
        itemId: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
