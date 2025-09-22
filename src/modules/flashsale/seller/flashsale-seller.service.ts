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
  FLASH_SALE_TYPE,
  UpdatableFlashSaleStatus,
} from 'src/common/constants/flash-sale.constant';
import { FlashSaleService } from '../flashsale.service';
import {
  CreateFlashSaleItemBodyType,
  UpdateFlashSaleItemBodyType,
} from '../flashsale-item.schema';
import { FlashSaleItemRepository } from '../flashsale-item.repository';
import { CommonSKURepository } from 'src/common/repositories/common-sku.repository';

@Injectable()
export class FlashsaleSellerService {
  constructor(
    private readonly flashSaleRepository: FlashSaleRepository,
    private readonly flashSaleItemRepository: FlashSaleItemRepository,
    private readonly commonSKURepository: CommonSKURepository,
    private readonly flashSaleService: FlashSaleService,
  ) {}
  async getAllFlashSales(query: FlashSaleListQueryType) {
    try {
      return await this.flashSaleRepository.list(query);
    } catch (error) {
      console.log('/brand', error);
      throw error;
    }
  }

  async getOneBySeller({
    id,
    createdById,
  }: {
    id: number;
    createdById: number;
  }) {
    try {
      const flashSale = await this.flashSaleRepository.findBySellerById({
        id,
        createdById,
      });
      if (!flashSale) {
        throw NotFoundRecordException;
      }
      return flashSale;
    } catch (error) {
      console.log('/flashSale/:id', error);
      throw error;
    }
  }

  async createFlashsale({
    data,
    createdById,
  }: {
    data: Omit<CreateFlashSaleBodyType, 'type'>;
    createdById: number;
  }) {
    try {
      const { isDraft, ...newData } = data;
      this.flashSaleService.validateFlashSaleTime(data.startAt, data.endAt);
      const status = isDraft
        ? FLASH_SALE_STATUS.DRAFT
        : this.flashSaleService.determineInitialStatus(
            data.startAt,
            data.endAt,
          );
      const flashSale = await this.flashSaleRepository.create({
        createdById,
        data: {
          ...newData,
          status,
          type: FLASH_SALE_TYPE.SELLER,
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
    data: Omit<UpdateFlashSaleBodyType, 'type'>;
    updatedById: number;
  }) {
    try {
      const flashSale = await this.flashSaleRepository.findById(id);

      switch (flashSale.status) {
        case FLASH_SALE_STATUS.DRAFT:
        case FLASH_SALE_STATUS.SCHEDULED: {
          // validate thời gian nếu startAt/endAt thay đổi
          if (data.startAt || data.endAt) {
            this.flashSaleService.validateFlashSaleTime(
              data.startAt || flashSale.startAt,
              data.endAt || flashSale.endAt,
            );
          }

          const status =
            flashSale.status === FLASH_SALE_STATUS.DRAFT && !data.startAt
              ? FLASH_SALE_STATUS.DRAFT
              : this.flashSaleService.determineInitialStatus(
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
            this.flashSaleService.validateFlashSaleTime(
              flashSale.startAt,
              flashSale.endAt,
            );
          }
          break;

        case FLASH_SALE_STATUS.LIVE:
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

  async addItem({
    id,
    data,
    createdById,
  }: {
    id: number;
    data: CreateFlashSaleItemBodyType[];
    createdById: number;
  }) {
    const flashSale = await this.flashSaleRepository.findById(id);
    if (!flashSale) {
      throw NotFoundRecordException;
    }
    const skuIds = data.map((d) => d.skuId);
    const skus = await this.commonSKURepository.findManySKU({
      ids: skuIds,
      createdById,
    });

    const skuMap = new Map<number, any>(skus.map((s) => [s.id, s]));

    for (const item of data) {
      const sku = skuMap.get(item.skuId);

      if (!sku) {
        throw new Error(
          `SKU with id ${item.skuId} does not exist or is not accessible`,
        );
      }

      if (item.stock > sku.quantity) {
        throw new Error(
          `Insufficient stock for SKU ${item.skuId}. Requested: ${item.stock}, Available: ${sku.quantity}`,
        );
      }
    }

    return this.flashSaleItemRepository.createMany({ id, createdById, data });
  }

  private async getValidFlashSaleOrThrow({
    id,
    itemId,
    createdById,
  }: {
    id: number;
    itemId: number;
    createdById: number;
  }) {
    const [flashSale, flashSaleItem] = await Promise.all([
      await this.flashSaleRepository.findById(id),
      await this.flashSaleItemRepository.findBySellerById({
        id: itemId,
        createdById,
      }),
    ]);
    if (!flashSale || !flashSaleItem) {
      throw NotFoundRecordException;
    }

    const allowedStatuses = [
      FLASH_SALE_STATUS.SCHEDULED,
      FLASH_SALE_STATUS.LIVE,
    ];

    if (!allowedStatuses.includes(flashSale.status)) {
      throw new ForbiddenException(
        `Flash sale must be SCHEDULED or LIVE, current: ${flashSale.status}`,
      );
    }

    return flashSale;
  }

  async updateItem({
    id,
    itemId,
    data,
    updatedById,
  }: {
    id: number;
    itemId: number;
    data: UpdateFlashSaleItemBodyType;
    updatedById: number;
  }) {
    try {
      await this.getValidFlashSaleOrThrow({
        id,
        itemId,
        createdById: updatedById,
      });
      return this.flashSaleItemRepository.update({ id, data, updatedById });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteItem({
    id,
    itemId,
    deletedById,
  }: {
    id: number;
    itemId: number;
    deletedById: number;
  }) {
    try {
      await this.getValidFlashSaleOrThrow({
        id,
        itemId,
        createdById: deletedById,
      });
      //  delete flashsale (xóa cứng)
      await this.flashSaleItemRepository.delete({ id, deletedById }, true);

      return { message: 'Delete flashsale item successfully' };
    } catch (error) {
      console.log('/flashsale/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
