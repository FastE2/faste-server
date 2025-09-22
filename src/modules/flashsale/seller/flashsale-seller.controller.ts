import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FlashsaleSellerService } from './flashsale-seller.service';
import { CreateFlashsaleDto } from '../dto/create-flashsale.dto';
import { UpdateFlashsaleDto } from '../dto/update-flashsale.dto';
import { CreateFlashsaleItemDto } from '../dto/create-flashsale-item.dto';
import { UpdateFlashsaleItemDto } from '../dto/update-flashsale-item.dto';

@Controller('seller/flashsales')
export class FlashsaleSellerController {
  constructor(
    private readonly flashSaleSellerService: FlashsaleSellerService,
  ) {}

  @Post()
  create(@Body() dto: CreateFlashsaleDto) {
    return this.flashSaleSellerService.create(dto);
  }

  @Get()
  findAll() {
    return this.flashSaleSellerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.flashSaleSellerService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateFlashsaleDto) {
    return this.flashSaleSellerService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.flashSaleSellerService.remove(+id);
  }

  // Items management
  @Post(':id/items')
  addItem(@Param('id') id: number, @Body() dto: CreateFlashsaleItemDto) {
    return this.flashSaleSellerService.addItem(+id, dto);
  }

  @Put(':id/items/:itemId')
  updateItem(
    @Param('itemId') itemId: number,
    @Body() dto: UpdateFlashsaleItemDto,
  ) {
    return this.flashSaleSellerService.updateItem(+itemId, dto);
  }

  @Delete(':id/items/:itemId')
  removeItem(@Param('itemId') itemId: number) {
    return this.flashSaleSellerService.removeItem(+itemId);
  }
}
