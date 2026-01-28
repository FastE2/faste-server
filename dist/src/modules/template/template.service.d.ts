import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { CreateTemplateBodyType, UpdateTemplateBodyType } from './template.schema';
import { TemplateRepository } from './template.repository';
export declare class TemplateService {
    private readonly templateRepository;
    constructor(templateRepository: TemplateRepository);
    getAllTemplates(query: PaginationQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getAllTemplatesByShop(query: PaginationQueryType, sellerId: number): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getTemplateIdIsPublic(id: number): Promise<any>;
    createTemplate({ data, createdById, }: {
        data: CreateTemplateBodyType;
        createdById: number;
    }): Promise<any>;
    updateTemplate({ id, data, updatedById, }: {
        id: number;
        data: UpdateTemplateBodyType;
        updatedById: number;
    }): Promise<any>;
    deleteTemplate({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
