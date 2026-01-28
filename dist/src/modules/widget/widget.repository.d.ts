import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWidgetBodyType, UpdateWidgetBodyType } from './widget.schema';
export declare class WidgetRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    listByShopInTemplate(templateId: number): Promise<any[]>;
    listByShopInTemplateIsPublic(templateId: number): Promise<any>;
    findById(id: number): Promise<any>;
    create({ sellerId, data, }: {
        sellerId: number;
        data: CreateWidgetBodyType;
    }): Promise<any>;
    update({ id, data, }: {
        id: number;
        data: UpdateWidgetBodyType;
    }): Promise<any>;
    delete({ id }: {
        id: number;
    }): Promise<any>;
}
