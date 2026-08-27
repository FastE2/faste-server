import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { AdminReportService } from './admin-report.service';
import {
  ReportQueryDTO,
  TopItemsQueryDTO,
  AdminOverviewResDTO,
  SalesTrendResDTO,
  TopProductsResDTO,
  TopSellersResDTO,
} from './report.dto';

@Controller('report/admin')
export class AdminReportController {
  constructor(private readonly adminReportService: AdminReportService) {}

  @Get('overview')
  @HttpCode(200)
  @ZodSerializerDto(AdminOverviewResDTO)
  getOverview(@Query() query: ReportQueryDTO) {
    return this.adminReportService.getOverview(query);
  }

  @Get('sales-trend')
  @HttpCode(200)
  @ZodSerializerDto(SalesTrendResDTO)
  getSalesTrend(@Query() query: ReportQueryDTO) {
    return this.adminReportService.getSalesTrend(query);
  }

  @Get('top-products')
  @HttpCode(200)
  @ZodSerializerDto(TopProductsResDTO)
  getTopProducts(@Query() query: TopItemsQueryDTO) {
    return this.adminReportService.getTopProducts(query);
  }

  @Get('top-sellers')
  @HttpCode(200)
  @ZodSerializerDto(TopSellersResDTO)
  getTopSellers(@Query() query: TopItemsQueryDTO) {
    return this.adminReportService.getTopSellers(query);
  }
}
