import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { CategoryService } from './category.service';
import { CreateCategoryBodyDTO, UpdateCategoryBodyDTO } from './category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAllCategorys(query: PaginationQueryDTO): Promise<{
        data: import("./category.schema").CategoryType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    createUser(body: CreateCategoryBodyDTO, userId: number): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date | null;
        description: string;
        image: string | null;
        parentCategoryId: number | null;
    }>;
    getById(params: GetParamsDTO): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date | null;
        description: string;
        image: string | null;
        parentCategoryId: number | null;
    }>;
    updateUser(body: UpdateCategoryBodyDTO, params: GetParamsDTO, userId: number): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date | null;
        description: string;
        image: string | null;
        parentCategoryId: number | null;
    }>;
    deleteUser(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
