import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryType, CreateCategoryBodyType, UpdateCategoryBodyType } from './category.schema';
export declare class CategoryRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(pagination: PaginationQueryType): Promise<{
        data: CategoryType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findById(id: number): Promise<CategoryType | null>;
    create({ createdById, data, }: {
        createdById: number;
        data: CreateCategoryBodyType;
    }): Promise<CategoryType>;
    update({ id, updatedById, data, }: {
        id: number;
        updatedById: number;
        data: UpdateCategoryBodyType;
    }): Promise<CategoryType>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
