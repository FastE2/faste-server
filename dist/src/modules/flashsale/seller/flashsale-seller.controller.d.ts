import { FlashsaleSellerService } from './flashsale-seller.service';
import { CreateFlashSaleBodyDTO, CreateFlashSaleItemBodyDTO, FlashSaleListSellerQueryDTO, GetParamsFlashSaleDTO, UpdateFlashSaleItemBodyDTO, UpdateFlashSaleStatusBodyDTO } from '../flashsale.dto';
import { GetParamsDTO } from 'src/common/dtos/request.dto';
export declare class FlashsaleSellerController {
    private readonly flashSaleSellerService;
    constructor(flashSaleSellerService: FlashsaleSellerService);
    create(body: CreateFlashSaleBodyDTO, userId: number): Promise<any>;
    findAll(query: FlashSaleListSellerQueryDTO, userId: number): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findOne(params: GetParamsDTO, userId: number): Promise<any>;
    update(body: any, params: GetParamsDTO, userId: number): Promise<any>;
    updateStatus(body: UpdateFlashSaleStatusBodyDTO, params: GetParamsDTO, userId: number): Promise<any>;
    addItem(body: CreateFlashSaleItemBodyDTO, params: GetParamsDTO, userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    updateItem(params: GetParamsFlashSaleDTO, body: UpdateFlashSaleItemBodyDTO, userId: number): Promise<any>;
    removeItem(params: GetParamsFlashSaleDTO, userId: number): Promise<{
        message: string;
    }>;
}
