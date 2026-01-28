import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { CategoryRepository } from './category.repository';
import { CreateCategoryBodyType, UpdateCategoryBodyType } from './category.schema';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    getAllCategorys(query: PaginationQueryType): Promise<{
        data: import("./category.schema").CategoryType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getCategoryById(id: number): Promise<{
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
    createCategory({ data, createdById, }: {
        data: CreateCategoryBodyType;
        createdById: number;
    }): Promise<{
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
    updateRole({ id, data, updatedById, }: {
        id: number;
        data: UpdateCategoryBodyType;
        updatedById: number;
    }): Promise<{
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
    deleteCategory({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
