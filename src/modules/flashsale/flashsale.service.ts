import { BadRequestException, Injectable } from '@nestjs/common';
import { FLASH_SALE_STATUS } from 'src/common/constants/flash-sale.constant';

@Injectable()
export class FlashSaleService {
  constructor() {}
  validateFlashSaleTime(startAt: Date, endAt: Date) {
    const now = Date.now();

    if (startAt.getTime() < now) {
      throw new BadRequestException('Start time must be in the future');
    }

    if (endAt.getTime() < startAt.getTime()) {
      throw new BadRequestException('End time must be after start time');
    }
  }
  determineInitialStatus(startAt: Date, endAt: Date) {
    const now = new Date();
    if (endAt <= now) return FLASH_SALE_STATUS.ENDED;
    if (startAt > now) return FLASH_SALE_STATUS.SCHEDULED;
    return FLASH_SALE_STATUS.LIVE;
  }
}
