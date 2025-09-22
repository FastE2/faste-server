import { Module } from '@nestjs/common';
import { FlashsaleAdminController } from './admin/flashsale-admin.controller';
import { FlashsaleSellerController } from './seller/flashsale-seller.controller';
import { FlashsaleClientController } from './client/flashsale-client.controller';
import { FlashSaleService } from './flashsale.service';
import { FlashsaleAdminService } from './admin/flashsale-admin.service';
import { FlashsaleSellerService } from './seller/flashsale-seller.service';
import { FlashsaleClientService } from './client/flashsale-client.service';
import { FlashSaleRepository } from './flashsale.repository';
import { FlashSaleItemRepository } from './flashsale-item.repository';

@Module({
  controllers: [
    FlashsaleAdminController,
    FlashsaleSellerController,
    FlashsaleClientController,
  ],
  providers: [
    FlashSaleService,
    FlashsaleAdminService,
    FlashsaleSellerService,
    FlashsaleClientService,
    FlashSaleRepository,
    FlashSaleItemRepository,
  ],
})
export class FlashsaleModule {}
