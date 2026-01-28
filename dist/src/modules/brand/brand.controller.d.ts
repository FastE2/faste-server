import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { BrandService } from './brand.service';
import { CreateBrandBodyDTO, UpdateBrandBodyDTO } from './brand.dto';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    getAllBrands(query: PaginationQueryDTO): Promise<{
        data: import("./brand.schema").BrandType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    createBrand(body: CreateBrandBodyDTO, userId: number): Promise<{
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
    getById(params: GetParamsDTO): Promise<{
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
    updateBrand(body: UpdateBrandBodyDTO, params: GetParamsDTO, userId: number): Promise<{
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
    deleteBrand(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
