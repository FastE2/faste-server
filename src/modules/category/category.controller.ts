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
import { CategoryService } from './category.service';
import {
  CreateCategoryBodyDTO,
  CreateCategoryResDTO,
  GetCategoryByIdResDTO,
  GetCategoryResDTO,
  UpdateCategoryBodyDTO,
  UpdateCategoryResDTO,
} from './category.dto';
import { Ispublic } from 'src/common/decorators/auth.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ZodSerializerDto(GetCategoryResDTO)
  @Ispublic()
  getAllCategorys(@Query() query: PaginationQueryDTO) {
    return this.categoryService.getAllCategorys(query);
  }
  @Post()
  @ZodSerializerDto(CreateCategoryResDTO)
  createUser(
    @Body() body: CreateCategoryBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.categoryService.createCategory({
      data: body,
      createdById: userId,
    });
  }

  @Get('/:id')
  @ZodSerializerDto(GetCategoryByIdResDTO)
  getById(@Param() params: GetParamsDTO) {
    return this.categoryService.getCategoryById(params.id);
  }

  @Patch('/:id')
  @ZodSerializerDto(UpdateCategoryResDTO)
  updateUser(
    @Body() body: UpdateCategoryBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.categoryService.updateRole({
      id: params.id,
      data: body,
      updatedById: userId,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteUser(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.categoryService.deleteCategory({
      id: params.id,
      deletedById: userId,
    });
  }
}
