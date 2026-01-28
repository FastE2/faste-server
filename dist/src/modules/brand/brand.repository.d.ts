import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { BrandType, CreateBrandBodyType, UpdateBrandBodyType } from './brand.schema';
export declare class BrandRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(pagination: PaginationQueryType): Promise<{
        data: BrandType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findById(id: number): Promise<BrandType | null>;
    create({ createdById, data, }: {
        createdById: number;
        data: CreateBrandBodyType;
    }): Promise<BrandType>;
    update({ id, updatedById, data, }: {
        id: number;
        updatedById: number;
        data: UpdateBrandBodyType;
    }): Promise<BrandType>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
