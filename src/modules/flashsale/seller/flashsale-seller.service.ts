import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';
import {
  CreateFlashSaleBodyType,
  FlashSaleListQueryType,
  UpdateFlashSaleBodyType,
} from '../flashsale.schema';
import { FlashSaleRepository } from '../flashsale.repository';
import {
  FLASH_SALE_STATUS,
  UpdatableFlashSaleStatus,
} from 'src/common/constants/flash-sale.constant';

@Injectable()
export class FlashsaleSellerService {
  constructor(private readonly flashSaleRepository: FlashSaleRepository) {}
  async getAllFlashSales(query: FlashSaleListQueryType) {
    try {
      return await this.flashSaleRepository.list(query);
    } catch (error) {
      console.log('/brand', error);
      throw error;
    }
  }

  async getFlashSaleById(id: number) {
    try {
      const flashSale = await this.flashSaleRepository.findById(id);
      if (!flashSale) {
        throw NotFoundRecordException;
      }
      return flashSale;
    } catch (error) {
      console.log('/flashSale/:id', error);
      throw error;
    }
  }

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

  async createFlashsale({
    data,
    createdById,
  }: {
    data: CreateFlashSaleBodyType;
    createdById: number;
  }) {
    try {
      const { isDraft, ...newData } = data;
      this.validateFlashSaleTime(data.startAt, data.endAt);
      const status = isDraft
        ? FLASH_SALE_STATUS.DRAFT
        : this.determineInitialStatus(data.startAt, data.endAt);
      const flashSale = await this.flashSaleRepository.create({
        createdById,
        data: {
          ...newData,
          status,
        },
      });
      return flashSale;
    } catch (error) {
      console.log('/flashSale', error);
      throw error;
    }
  }

  async updateFlashSale({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdateFlashSaleBodyType;
    updatedById: number;
  }) {
    try {
      const flashSale = await this.flashSaleRepository.findById(id);

      switch (flashSale.status) {
        case FLASH_SALE_STATUS.DRAFT:
        case FLASH_SALE_STATUS.SCHEDULED: {
          // validate thời gian nếu startAt/endAt thay đổi
          if (data.startAt || data.endAt) {
            this.validateFlashSaleTime(
              data.startAt || flashSale.startAt,
              data.endAt || flashSale.endAt,
            );
          }

          const status =
            flashSale.status === FLASH_SALE_STATUS.DRAFT && !data.startAt
              ? FLASH_SALE_STATUS.DRAFT
              : this.determineInitialStatus(
                  data.startAt || flashSale.startAt,
                  data.endAt || flashSale.endAt,
                );

          return this.flashSaleRepository.update({
            id,
            updatedById,
            data: {
              ...data,
              status,
            },
          });
        }

        case FLASH_SALE_STATUS.LIVE: {
          const allowedFields = ['description', 'image', 'name'];
          const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key]) => allowedFields.includes(key)),
          );

          return this.flashSaleRepository.update({
            id,
            updatedById,
            data: {
              ...filteredData,
            },
          });
        }

        case FLASH_SALE_STATUS.ENDED:
        case FLASH_SALE_STATUS.CANCELLED:
          throw new BadRequestException(
            'Cannot update a flash sale that is ENDED or CANCELLED',
          );
      }
    } catch (error) {
      console.log('/flashsale/:id', error);
      throw error;
    }
  }

  async updateFlashSaleStatus({
    id,
    status,
    updatedById,
  }: {
    id: number;
    status: UpdatableFlashSaleStatus;
    updatedById: number;
  }) {
    try {
      const flashSale = await this.flashSaleRepository.findById(id);

      switch (flashSale.status) {
        case FLASH_SALE_STATUS.DRAFT:
        case FLASH_SALE_STATUS.SCHEDULED:
          if (
            status === FLASH_SALE_STATUS.DRAFT ||
            status === FLASH_SALE_STATUS.SCHEDULED
          ) {
            this.validateFlashSaleTime(flashSale.startAt, flashSale.endAt);
          }
          break;

        case FLASH_SALE_STATUS.LIVE:
          if (status !== FLASH_SALE_STATUS.CANCELLED) {
            throw new ForbiddenException(
              'LIVE flash sale can only be cancelled',
            );
          }
          break;

        case FLASH_SALE_STATUS.ENDED:
        case FLASH_SALE_STATUS.CANCELLED:
          throw new ForbiddenException(
            'Cannot update ENDED or CANCELLED flash sale',
          );
      }

      return this.flashSaleRepository.update({
        id,
        updatedById,
        data: {
          status,
        },
      });
    } catch (error) {
      console.log('/flashsale/:id/status', error);
      throw error;
    }
  }

  async deleteFlashSale({
    id,
    deletedById,
  }: {
    id: number;
    deletedById: number;
  }) {
    try {
      //  delete flashsale (xóa mềm)
      await this.flashSaleRepository.delete({ id, deletedById });

      return { message: 'Delete flashsale successfully' };
    } catch (error) {
      console.log('/flashsale/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
