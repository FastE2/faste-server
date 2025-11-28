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
import {
  GetParamSlugDTO,
  GetShopByIdResDTO,
  GetShopResDTO,
  RegisterShopBodyDTO,
  UpdateShopBodyDTO,
  UpdateShopResDTO,
} from './shop.dto';
import { ShopService } from './shop.service';
import { Ispublic } from 'src/common/decorators/auth.decorator';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('/public')
  @Ispublic()
  @ZodSerializerDto(GetShopResDTO)
  getAllShopsIsPublic(@Query() query: PaginationQueryDTO) {
    return this.shopService.getAllShopsIsPublic(query);
  }

  @Get('slug/:slug')
  @Ispublic()
  @ZodSerializerDto(GetShopByIdResDTO)
  getBySlug(@Param() params: GetParamSlugDTO) {
    return this.shopService.getShopBySlug(params.slug);
  }

  @Get()
  @ZodSerializerDto(GetShopResDTO)
  getAllShops(@Query() query: PaginationQueryDTO) {
    return this.shopService.getAllShops(query);
  }

  @Post('register')
  // @ZodSerializerDto(RegisterResDTO)
  registerShop(
    @Body() body: RegisterShopBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.shopService.registerShop(userId, body);
  }

  // @Get('/:slug')
  // @Ispublic()
  // @ZodSerializerDto(GetShopByIdResDTO)
  // getBySlugPublic(@Param() params: GetParamSlugDTO) {
  //   return this.shopService.getShopBySlug(params.slug);
  // }

  @Get('/:id')
  @ZodSerializerDto(GetShopByIdResDTO)
  getById(@Param() params: GetParamsDTO) {
    return this.shopService.getShopById(params.id);
  }

  @Get('/me/detail')
  // @ZodSerializerDto(GetShopByIdResDTO)
  getShopMe(@ActiveUser('userId') userId: number) {
    console.log(userId);
    return this.shopService.getShopById(userId);
  }

  @Patch('/:id')
  @ZodSerializerDto(UpdateShopResDTO)
  updateShop(
    @Body() body: UpdateShopBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.shopService.updateShop({
      id: params.id,
      data: body,
      updatedById: userId,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteShop(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.shopService.deleteShop({
      id: params.id,
      deletedById: userId,
    });
  }
}
