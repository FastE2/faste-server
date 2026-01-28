import { CreateFlashSaleBodyType, FlashSaleListQueryType, UpdateFlashSaleBodyType } from '../flashsale.schema';
import { FlashSaleRepository } from '../flashsale.repository';
import { UpdatableFlashSaleStatus } from 'src/common/constants/flash-sale.constant';
import { FlashSaleService } from '../flashsale.service';
export declare class FlashsaleAdminService {
    private readonly flashSaleRepository;
    private readonly flashSaleService;
    constructor(flashSaleRepository: FlashSaleRepository, flashSaleService: FlashSaleService);
    getAllFlashSales(query: FlashSaleListQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getFlashSaleById(id: number): Promise<any>;
    createFlashsale({ data, createdById, }: {
        data: CreateFlashSaleBodyType;
        createdById: number;
    }): Promise<any>;
    updateFlashSale({ id, data, updatedById, }: {
        id: number;
        data: UpdateFlashSaleBodyType;
        updatedById: number;
    }): Promise<any>;
    updateFlashSaleStatus({ id, status, updatedById, }: {
        id: number;
        status: UpdatableFlashSaleStatus;
        updatedById: number;
    }): Promise<any>;
    deleteFlashSale({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
