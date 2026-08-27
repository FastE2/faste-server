import { createZodDto } from 'nestjs-zod';
import {
  ReportQuerySchema,
  TopItemsQuerySchema,
  SellerOverviewResSchema,
  AdminOverviewResSchema,
  SalesTrendResSchema,
  TopProductsResSchema,
  TopSellersResSchema,
} from './report.schema';

export class ReportQueryDTO extends createZodDto(ReportQuerySchema) {}
export class TopItemsQueryDTO extends createZodDto(TopItemsQuerySchema) {}
export class SellerOverviewResDTO extends createZodDto(
  SellerOverviewResSchema,
) {}
export class AdminOverviewResDTO extends createZodDto(AdminOverviewResSchema) {}
export class SalesTrendResDTO extends createZodDto(SalesTrendResSchema) {}
export class TopProductsResDTO extends createZodDto(TopProductsResSchema) {}
export class TopSellersResDTO extends createZodDto(TopSellersResSchema) {}
