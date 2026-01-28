import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { BrandRepository } from './brand.repository';
import { CreateBrandBodyType, UpdateBrandBodyType } from './brand.schema';
export declare class BrandService {
    private readonly brandRepository;
    constructor(brandRepository: BrandRepository);
    getAllBrands(query: PaginationQueryType): Promise<{
        data: import("./brand.schema").BrandType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getBrandById(id: number): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        logo: string;
    }>;
    createBrand({ data, createdById, }: {
        data: CreateBrandBodyType;
        createdById: number;
    }): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        logo: string;
    }>;
    updateBrand({ id, data, updatedById, }: {
        id: number;
        data: UpdateBrandBodyType;
        updatedById: number;
    }): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        logo: string;
    }>;
    deleteBrand({ id, deletedById }: {
        id: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
