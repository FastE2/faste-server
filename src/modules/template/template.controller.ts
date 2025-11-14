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
import { CreateTemplateBodyDTO, UpdateTemplateBodyDTO } from './template.dto';
import { TemplateService } from './template.service';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  // @ZodSerializerDto(GetBrandResDTO)
  getAllTemplates(@Query() query: PaginationQueryDTO) {
    return this.templateService.getAllTemplates(query);
  }

  @Get()
  // @ZodSerializerDto(GetBrandResDTO)
  getAllTemplatesByShop(
    @Query() query: PaginationQueryDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.templateService.getAllTemplatesByShop(query, userId);
  }

  @Post()
  // @ZodSerializerDto(CreateBrandResDTO)
  createBrand(
    @Body() body: CreateTemplateBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.templateService.createTemplate({
      data: body,
      createdById: userId,
    });
  }

  @Get('/:id')
  // @ZodSerializerDto(GetBrandByIdResDTO)
  @Ispublic()
  getTemplateIdIsPublic(@Param() params: GetParamsDTO) {
    return this.templateService.getTemplateIdIsPublic(params.id);
  }

  @Patch('/:id')
  // @ZodSerializerDto(UpdateBrandResDTO)
  updateBrand(
    @Body() body: UpdateTemplateBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.templateService.updateTemplate({
      id: params.id,
      data: body,
      updatedById: userId,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteBrand(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.templateService.deleteTemplate({
      id: params.id,
      deletedById: userId,
    });
  }
}
