import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { ShopRepository } from './shop.repository';
import { RegisterShopBodyType, UpdateShopBodyType } from './shop.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
export declare class ShopService {
    private readonly shopRepository;
    private readonly commonUserRepository;
    private readonly commonRoleRepository;
    constructor(shopRepository: ShopRepository, commonUserRepository: CommonUserRepository, commonRoleRepository: CommonRoleRepository);
    getAllShops(query: PaginationQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getAllShopsIsPublic(query: PaginationQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    registerShop(userId: number, body: RegisterShopBodyType): Promise<any>;
    getShopById(id: number): Promise<any>;
    getShopBySlug(slug: string): Promise<any>;
    updateShop({ id, data, updatedById, }: {
        id: number;
        data: UpdateShopBodyType;
        updatedById: number;
    }): Promise<any>;
    deleteShop({ id, deletedById }: {
        id: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
