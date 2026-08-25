import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
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
  GetProductsManageQueryDTO,
  GetProductsQueryDTO,
  UpdateProductBodyDTO,
} from './product.dto';
import { Ispublic } from 'src/common/decorators/auth.decorator';
import { ActiveRolePermissions } from 'src/common/decorators/active-role-permissions.decorator';
import { UserAgent } from 'src/common/decorators/user-agent.decorator';

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

  // -- PUBLIC
  @Get('/public/shop/:id')
  @Ispublic()
  @ZodSerializerDto(GetAllProductPublicResDTO)
  getPublicProductsByShop(
    @Query() query: GetProductsQueryDTO,
    @Param() params: GetParamsDTO,
  ) {
    return this.productService.findAllPublicByShop(query, params.id);
  }

  @Get('/public/:id')
  @Ispublic()
  getById(@Param() params: GetParamsDTO) {
    return this.productService.findByIdPublic(params.id);
  }

  @Get('/public/slug/:slugId')
  @Ispublic()
  getBySlugId(
    @UserAgent() userAgent: string,
    @Ip() ip: string,
    @Param() params: GetParamSlugIdDTO,
  ) {
    return this.productService.findBySlugIdPublic(params.slugId, ip, userAgent);
  }
  // -- END PUBLIC

  @Get('')
  getProducts(
    @Query() query: GetProductsManageQueryDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.productService.findAll({ query, userId, roleName });
  }

  @Get('/:id')
  getProductDetail(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.productService.findById({ id: params.id, userId, roleName });
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
