import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { FlashSaleRepository } from '../flashsale.repository';
import { FLASH_SALE_STATUS } from 'src/common/constants/flash-sale.constant';
import { FlashSaleItemRepository } from '../flashsale-item.repository';

@Injectable()
export class FlashsaleClientService {
  constructor(
    private readonly flashSaleRepository: FlashSaleRepository,
    private readonly flashSaleItemRepository: FlashSaleItemRepository,
  ) {}
  async findActive(query: PaginationQueryType) {
    try {
      const { page, limit } = query;
      return await this.flashSaleRepository.list({
        limit,
        page,
        status: FLASH_SALE_STATUS.LIVE,
      });
    } catch (error) {
      console.log('/flashsales', error);
      throw error;
    }
  }

  async findUpcoming(query: PaginationQueryType) {
    try {
      const { page, limit } = query;
      return await this.flashSaleRepository.list({
        limit,
        page,
        status: FLASH_SALE_STATUS.SCHEDULED,
      });
    } catch (error) {
      console.log('/flashsales/upcoming', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const flashSale = await this.flashSaleRepository.findById(id);
      if (!flashSale) {
        throw NotFoundRecordException;
      }
      return flashSale;
    } catch (error) {
      console.log('/flashsales/:id', error);
      throw error;
    }
  }

  async findItems({ id, query }: { id: number; query: PaginationQueryType }) {
    try {
      const flashSale = await this.flashSaleItemRepository.list(query, id);
      if (!flashSale) {
        throw NotFoundRecordException;
      }
      return flashSale;
    } catch (error) {
      console.log('/flashsales/:id/items', error);
      throw error;
    }
  }
}
