import { GetParamsDTO } from 'src/common/dtos/request.dto';
import { WidgetService } from './widget.service';
import { CreateWidgetBodyDTO, UpdateManyWidgetsDTO, UpdateWidgetBodyDTO } from './widget.dto';
export declare class WidgetController {
    private readonly widgetService;
    constructor(widgetService: WidgetService);
    getAllWidgets(templateId: string, userId: number): Promise<any[]>;
    getAllWidgetsByTemplateIsPublic(templateId: number): Promise<any>;
    createWidget(body: CreateWidgetBodyDTO, userId: number): Promise<any>;
    getWidgetId(params: GetParamsDTO): Promise<any>;
    updateWidget(body: UpdateWidgetBodyDTO, params: GetParamsDTO, userId: number): Promise<any>;
    updateManyWidgets(templateId: string, body: UpdateManyWidgetsDTO, userId: number): Promise<{
        message: string;
        updated?: undefined;
    } | {
        message: string;
        updated: number;
    }>;
    deleteWidget(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
