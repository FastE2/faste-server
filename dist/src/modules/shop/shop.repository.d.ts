import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterShopBodyType, UpdateShopBodyType } from './shop.schema';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
export type WhereUniqueShopType = {
    shopid: number;
} | {
    slug: string;
};
export declare class ShopRepository {
    private readonly prismaService;
    private readonly commonRoleRepository;
    constructor(prismaService: PrismaService, commonRoleRepository: CommonRoleRepository);
    findAll(pagination: PaginationQueryType, isPublic?: boolean): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findOne(where: WhereUniqueShopType, fillter?: {
        isActive: boolean;
    }): Promise<any>;
    create({ userId, data, }: {
        userId: number;
        data: RegisterShopBodyType;
    }): Promise<any>;
    update({ id, data, }: {
        id: number;
        updatedById: number;
        data: UpdateShopBodyType;
    }): Promise<any>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
