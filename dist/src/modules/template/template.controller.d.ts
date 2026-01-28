import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { CreateTemplateBodyDTO, UpdateTemplateBodyDTO } from './template.dto';
import { TemplateService } from './template.service';
export declare class TemplateController {
    private readonly templateService;
    constructor(templateService: TemplateService);
    getAllTemplates(query: PaginationQueryDTO): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getAllTemplatesByShop(query: PaginationQueryDTO, userId: number): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    createBrand(body: CreateTemplateBodyDTO, userId: number): Promise<any>;
    getTemplateIdIsPublic(params: GetParamsDTO): Promise<any>;
    updateBrand(body: UpdateTemplateBodyDTO, params: GetParamsDTO, userId: number): Promise<any>;
    deleteBrand(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
