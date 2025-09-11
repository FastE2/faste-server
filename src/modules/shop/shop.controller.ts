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
  GetShopByIdResDTO,
  GetShopResDTO,
  RegisterShopBodyDTO,
  UpdateShopBodyDTO,
  UpdateShopResDTO,
} from './shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

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

  @Get('/:id')
  @ZodSerializerDto(GetShopByIdResDTO)
  getById(@Param() params: GetParamsDTO) {
    return this.shopService.getShopById(params.id);
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
