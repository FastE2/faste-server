import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { FlashsaleAdminService } from './flashsale-admin.service';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { UpdateFlashSaleStatusBodyDTO } from '../flashsale.dto';

@Controller('admin/flashsales')
export class FlashsaleAdminController {
  constructor(private readonly flashsaleAdminService: FlashsaleAdminService) {}

  @Post()
  create(@Body() body: any, @ActiveUser('userId') userId: number) {
    return this.flashsaleAdminService.createFlashsale({
      data: body,
      createdById: userId,
    });
  }

  @Get()
  findAll(@Query() query: PaginationQueryDTO) {
    return this.flashsaleAdminService.getAllFlashSales(query);
  }

  @Get(':id')
  findOne(@Param() params: GetParamsDTO) {
    return this.flashsaleAdminService.getFlashSaleById(params.id);
  }

  @Put(':id')
  update(
    @Body() body: any,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.flashsaleAdminService.updateFlashSale({
      id: params.id,
      updatedById: userId,
      data: body,
    });
  }

  @Delete(':id')
  remove(@Param() params: GetParamsDTO, @ActiveUser('userId') userId: number) {
    return this.flashsaleAdminService.deleteFlashSale({
      deletedById: userId,
      id: params.id,
    });
  }

  @Patch(':id/status')
  updateStatus(
    @Body() body: UpdateFlashSaleStatusBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.flashsaleAdminService.updateFlashSaleStatus({
      id: params.id,
      updatedById: userId,
      status: body.status,
    });
  }
}
