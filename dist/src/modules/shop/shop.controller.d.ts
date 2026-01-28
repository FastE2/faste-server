import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { GetParamSlugDTO, RegisterShopBodyDTO, UpdateShopBodyDTO } from './shop.dto';
import { ShopService } from './shop.service';
export declare class ShopController {
    private readonly shopService;
    constructor(shopService: ShopService);
    getAllShopsIsPublic(query: PaginationQueryDTO): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getBySlug(params: GetParamSlugDTO): Promise<any>;
    getAllShops(query: PaginationQueryDTO): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    registerShop(body: RegisterShopBodyDTO, userId: number): Promise<any>;
    getById(params: GetParamsDTO): Promise<any>;
    getShopMe(userId: number): Promise<any>;
    updateShop(body: UpdateShopBodyDTO, params: GetParamsDTO, userId: number): Promise<any>;
    deleteShop(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
