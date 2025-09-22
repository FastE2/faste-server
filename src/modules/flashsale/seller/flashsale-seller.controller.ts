import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { FlashsaleSellerService } from './flashsale-seller.service';
import {
  CreateFlashSaleBodyDTO,
  CreateFlashSaleItemBodyDTO,
  FlashSaleListSellerQueryDTO,
  GetParamsFlashSaleDTO,
  UpdateFlashSaleItemBodyDTO,
  UpdateFlashSaleStatusBodyDTO,
} from '../flashsale.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { FLASH_SALE_TYPE } from 'src/common/constants/flash-sale.constant';
import { GetParamsDTO } from 'src/common/dtos/request.dto';
import { ZodSerializerDto } from 'nestjs-zod';
import { MessageResDTO } from 'src/common/dtos/response.dto';

@Controller('seller/flashsales')
export class FlashsaleSellerController {
  constructor(
    private readonly flashSaleSellerService: FlashsaleSellerService,
  ) {}

  @Post()
  create(
    @Body() body: CreateFlashSaleBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.flashSaleSellerService.createFlashsale({
      createdById: userId,
      data: body,
    });
  }

  @Get()
  findAll(
    @Query() query: FlashSaleListSellerQueryDTO,
    @ActiveUser('userId') userId: number,
  ) {
    const { limit, page, status } = query;
    return this.flashSaleSellerService.getAllFlashSales({
      limit,
      page,
      status,
      createdById: userId,
      type: FLASH_SALE_TYPE.SELLER,
    });
  }

  @Get(':id')
  findOne(@Param() params: GetParamsDTO, @ActiveUser('userId') userId: number) {
    return this.flashSaleSellerService.getOneBySeller({
      id: params.id,
      createdById: userId,
    });
  }

  @Put(':id')
  update(
    @Body() body: any,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.flashSaleSellerService.updateFlashSale({
      id: params.id,
      updatedById: userId,
      data: body,
    });
  }

  @Patch(':id/status')
  updateStatus(
    @Body() body: UpdateFlashSaleStatusBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.flashSaleSellerService.updateFlashSaleStatus({
      id: params.id,
      updatedById: userId,
      status: body.status,
    });
  }

  // Items management
  @Post(':id/items')
  addItem(
    @Body() body: CreateFlashSaleItemBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.flashSaleSellerService.addItem({
      id: params.id,
      createdById: userId,
      data: body,
    });
  }

  @Put(':id/items/:itemId')
  updateItem(
    @Param() params: GetParamsFlashSaleDTO,
    @Body() body: UpdateFlashSaleItemBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    const { id, itemId } = params;
    return this.flashSaleSellerService.updateItem({
      id,
      itemId,
      data: body,
      updatedById: userId,
    });
  }

  @Delete(':id/items/:itemId')
  @ZodSerializerDto(MessageResDTO)
  removeItem(
    @Param() params: GetParamsFlashSaleDTO,
    @ActiveUser('userId') userId: number,
  ) {
    const { id, itemId } = params;
    return this.flashSaleSellerService.deleteItem({
      id,
      itemId,
      deletedById: userId,
    });
  }
}
