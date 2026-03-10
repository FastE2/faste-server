import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';

import { Ispublic } from 'src/common/decorators/auth.decorator';
import { WidgetService } from './widget.service';
import {
  CreateWidgetBodyDTO,
  UpdateManyWidgetsDTO,
  UpdateWidgetBodyDTO,
} from './widget.dto';

@Controller('widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get('/template/:templateId')
  // @ZodSerializerDto(GetBrandResDTO)
  getAllWidgets(
    @Param('templateId') templateId: string,
    @ActiveUser('userId') userId: number,
  ) {
    console.log('templateId', templateId);
    return this.widgetService.getAllWidgetsByTemplate(
      Number(templateId),
      userId,
    );
  }

  @Get('/template/:templateId/public')
  // @ZodSerializerDto(GetBrandResDTO)
  @Ispublic()
  getAllWidgetsByTemplateIsPublic(@Param('templateId') templateId: number) {
    return this.widgetService.getAllWidgetsByTemplateIsPublic(templateId);
  }

  @Post()
  // @ZodSerializerDto(CreateBrandResDTO)
  createWidget(
    @Body() body: CreateWidgetBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.widgetService.createWidget({
      data: body,
      createdById: userId,
    });
  }

  @Get('/:id')
  // @ZodSerializerDto(GetBrandByIdResDTO)
  getWidgetId(@Param() params: GetParamsDTO) {
    return this.widgetService.getWidgetId(params.id);
  }

  @Patch('/:id')
  // @ZodSerializerDto(UpdateBrandResDTO)
  updateWidget(
    @Body() body: UpdateWidgetBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.widgetService.updateWidget({
      id: params.id,
      data: body,
      updatedById: userId,
    });
  }

  @Patch('template/:templateId')
  // @ZodSerializerDto(UpdateBrandResDTO)
  updateManyWidgets(
    @Param('templateId') templateId: string,
    @Body() body: UpdateManyWidgetsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.widgetService.updateWidgets(Number(templateId), body);
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteWidget(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.widgetService.deleteWidget({
      id: params.id,
      deletedById: userId,
    });
  }
}
