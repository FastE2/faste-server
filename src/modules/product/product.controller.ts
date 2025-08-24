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
import { ProductService } from './product.service';
import {
  CreateProductBodyDTO,
  GetAllProductPublicResDTO,
  GetParamSlugIdDTO,
  GetProductsQueryDTO,
  UpdateProductBodyDTO,
} from './product.dto';
import { Ispublic } from 'src/common/decorators/auth.decorator';
import { ActiveRolePermissions } from 'src/common/decorators/active-role-permissions.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // -- PUBLIC
  @Get('/public')
  @Ispublic()
  @ZodSerializerDto(GetAllProductPublicResDTO)
  getPublicProducts(@Query() query: GetProductsQueryDTO) {
    return this.productService.findAllPublic(query);
  }

  @Get('/public/:id')
  @Ispublic()
  getById(@Param() params: GetParamsDTO) {
    return this.productService.findByIdPublic(params.id);
  }

  @Get('/public/slug/:slugId')
  @Ispublic()
  getBySlugId(@Param() params: GetParamSlugIdDTO) {
    return this.productService.findBySlugIdPublic(params.slugId);
  }
  // -- END PUBLIC

  @Get('')
  @Ispublic()
  getProducts(
    @Query() query: GetProductsQueryDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.productService.findAll({ query, userId, roleName });
  }

  @Post()
  createProduct(
    @Body() body: CreateProductBodyDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.productService.create({
      data: body,
      createdById: userId,
      roleName,
    });
  }

  @Patch('/:id')
  updateUser(
    @Body() body: UpdateProductBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.productService.update({
      id: params.id,
      data: body,
      updatedById: userId,
      roleName,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteUser(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.productService.delete({
      id: params.id,
      deletedById: userId,
      roleName,
    });
  }
}
