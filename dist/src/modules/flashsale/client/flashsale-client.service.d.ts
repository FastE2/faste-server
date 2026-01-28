import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { FlashSaleRepository } from '../flashsale.repository';
import { FlashSaleItemRepository } from '../flashsale-item.repository';
export declare class FlashsaleClientService {
    private readonly flashSaleRepository;
    private readonly flashSaleItemRepository;
    constructor(flashSaleRepository: FlashSaleRepository, flashSaleItemRepository: FlashSaleItemRepository);
    findActive(query: PaginationQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findUpcoming(query: PaginationQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findOne(id: number): Promise<any>;
    findItems({ id, query }: {
        id: number;
        query: PaginationQueryType;
    }): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
}
