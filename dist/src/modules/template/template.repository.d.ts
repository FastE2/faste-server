import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTemplateBodyType, UpdateTemplateBodyType } from './template.schema';
export declare class TemplateRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(pagination: PaginationQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    listByShop(pagination: PaginationQueryType, sellerId: number): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findByIdIsPublic(id: number): Promise<any>;
    findAllByShop(id: number): Promise<any>;
    create({ sellerId, data, }: {
        sellerId: number;
        data: CreateTemplateBodyType;
    }): Promise<any>;
    update({ id, data, }: {
        id: number;
        data: UpdateTemplateBodyType;
    }): Promise<any>;
    delete({ id }: {
        id: number;
    }): Promise<any>;
}
