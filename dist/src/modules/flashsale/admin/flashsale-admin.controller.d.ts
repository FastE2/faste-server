import { FlashsaleAdminService } from './flashsale-admin.service';
import { GetParamsDTO } from 'src/common/dtos/request.dto';
import { FlashSaleListQueryDTO, UpdateFlashSaleStatusBodyDTO } from '../flashsale.dto';
export declare class FlashsaleAdminController {
    private readonly flashsaleAdminService;
    constructor(flashsaleAdminService: FlashsaleAdminService);
    create(body: any, userId: number): Promise<any>;
    findAll(query: FlashSaleListQueryDTO): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findOne(params: GetParamsDTO): Promise<any>;
    update(body: any, params: GetParamsDTO, userId: number): Promise<any>;
    remove(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
    updateStatus(body: UpdateFlashSaleStatusBodyDTO, params: GetParamsDTO, userId: number): Promise<any>;
}
