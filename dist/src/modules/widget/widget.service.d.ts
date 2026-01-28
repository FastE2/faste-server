import { CreateWidgetBodyType, UpdateManyWidgetsType, UpdateWidgetBodyType } from './widget.schema';
import { WidgetRepository } from './widget.repository';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class WidgetService {
    private readonly widgetRepository;
    private readonly prismaService;
    constructor(widgetRepository: WidgetRepository, prismaService: PrismaService);
    getAllWidgetsByTemplate(templateId: number, userId: number): Promise<any[]>;
    getAllWidgetsByTemplateIsPublic(templateId: number): Promise<any>;
    getWidgetId(id: number): Promise<any>;
    createWidget({ data, createdById, }: {
        data: CreateWidgetBodyType;
        createdById: number;
    }): Promise<any>;
    updateWidget({ id, data, updatedById, }: {
        id: number;
        data: UpdateWidgetBodyType;
        updatedById: number;
    }): Promise<any>;
    updateWidgets(templateId: number, data: UpdateManyWidgetsType): Promise<{
        message: string;
        updated?: undefined;
    } | {
        message: string;
        updated: number;
    }>;
    deleteWidget({ id, deletedById }: {
        id: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
