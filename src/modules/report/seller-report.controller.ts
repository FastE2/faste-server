import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { SellerReportService } from './seller-report.service';
import {
  ReportQueryDTO,
  TopItemsQueryDTO,
  SellerOverviewResDTO,
  SalesTrendResDTO,
  TopProductsResDTO,
} from './report.dto';

@Controller('report/seller')
export class SellerReportController {
  constructor(private readonly sellerReportService: SellerReportService) {}

  @Get('overview')
  @HttpCode(200)
  @ZodSerializerDto(SellerOverviewResDTO)
  getOverview(
    @ActiveUser('userId') userId: number,
    @Query() query: ReportQueryDTO,
  ) {
    return this.sellerReportService.getOverview(userId, query);
  }

  @Get('sales-trend')
  @HttpCode(200)
  @ZodSerializerDto(SalesTrendResDTO)
  getSalesTrend(
    @ActiveUser('userId') userId: number,
    @Query() query: ReportQueryDTO,
  ) {
    return this.sellerReportService.getSalesTrend(userId, query);
  }

  @Get('top-products')
  @HttpCode(200)
  @ZodSerializerDto(TopProductsResDTO)
  getTopProducts(
    @ActiveUser('userId') userId: number,
    @Query() query: TopItemsQueryDTO,
  ) {
    return this.sellerReportService.getTopProducts(userId, query);
  }
}
