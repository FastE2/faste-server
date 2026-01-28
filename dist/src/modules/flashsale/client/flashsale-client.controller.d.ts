import { FlashsaleClientService } from './flashsale-client.service';
import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
export declare class FlashsaleClientController {
    private readonly flashSaleClientService;
    constructor(flashSaleClientService: FlashsaleClientService);
    getActive(query: PaginationQueryDTO): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getUpcoming(query: PaginationQueryDTO): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getOne(params: GetParamsDTO): Promise<any>;
    getItems(params: GetParamsDTO, query: PaginationQueryDTO): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
}
