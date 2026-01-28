"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashsaleSellerService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../../common/errors");
const prisma_1 = require("../../../common/errors/prisma");
const flashsale_repository_1 = require("../flashsale.repository");
const flash_sale_constant_1 = require("../../../common/constants/flash-sale.constant");
const flashsale_service_1 = require("../flashsale.service");
const flashsale_item_repository_1 = require("../flashsale-item.repository");
const common_sku_repository_1 = require("../../../common/repositories/common-sku.repository");
let FlashsaleSellerService = class FlashsaleSellerService {
    flashSaleRepository;
    flashSaleItemRepository;
    commonSKURepository;
    flashSaleService;
    constructor(flashSaleRepository, flashSaleItemRepository, commonSKURepository, flashSaleService) {
        this.flashSaleRepository = flashSaleRepository;
        this.flashSaleItemRepository = flashSaleItemRepository;
        this.commonSKURepository = commonSKURepository;
        this.flashSaleService = flashSaleService;
    }
    async getAllFlashSales(query) {
        try {
            return await this.flashSaleRepository.list(query);
        }
        catch (error) {
            console.log('/brand', error);
            throw error;
        }
    }
    async getOneBySeller({ id, createdById, }) {
        try {
            const flashSale = await this.flashSaleRepository.findBySellerById({
                id,
                createdById,
            });
            if (!flashSale) {
                throw errors_1.NotFoundRecordException;
            }
            return flashSale;
        }
        catch (error) {
            console.log('/flashSale/:id', error);
            throw error;
        }
    }
    async createFlashsale({ data, createdById, }) {
        try {
            const { isDraft, ...newData } = data;
            this.flashSaleService.validateFlashSaleTime(data.startAt, data.endAt);
            const status = isDraft
                ? flash_sale_constant_1.FLASH_SALE_STATUS.DRAFT
                : this.flashSaleService.determineInitialStatus(data.startAt, data.endAt);
            const flashSale = await this.flashSaleRepository.create({
                createdById,
                data: {
                    ...newData,
                    status,
                    type: flash_sale_constant_1.FLASH_SALE_TYPE.SELLER,
                },
            });
            return flashSale;
        }
        catch (error) {
            console.log('/flashSale', error);
            throw error;
        }
    }
    async updateFlashSale({ id, data, updatedById, }) {
        try {
            const flashSale = await this.flashSaleRepository.findById(id);
            switch (flashSale.status) {
                case flash_sale_constant_1.FLASH_SALE_STATUS.DRAFT:
                case flash_sale_constant_1.FLASH_SALE_STATUS.SCHEDULED: {
                    if (data.startAt || data.endAt) {
                        this.flashSaleService.validateFlashSaleTime(data.startAt || flashSale.startAt, data.endAt || flashSale.endAt);
                    }
                    const status = flashSale.status === flash_sale_constant_1.FLASH_SALE_STATUS.DRAFT && !data.startAt
                        ? flash_sale_constant_1.FLASH_SALE_STATUS.DRAFT
                        : this.flashSaleService.determineInitialStatus(data.startAt || flashSale.startAt, data.endAt || flashSale.endAt);
                    return this.flashSaleRepository.update({
                        id,
                        updatedById,
                        data: {
                            ...data,
                            status,
                        },
                    });
                }
                case flash_sale_constant_1.FLASH_SALE_STATUS.LIVE: {
                    const allowedFields = ['description', 'image', 'name'];
                    const filteredData = Object.fromEntries(Object.entries(data).filter(([key]) => allowedFields.includes(key)));
                    return this.flashSaleRepository.update({
                        id,
                        updatedById,
                        data: {
                            ...filteredData,
                        },
                    });
                }
                case flash_sale_constant_1.FLASH_SALE_STATUS.ENDED:
                case flash_sale_constant_1.FLASH_SALE_STATUS.CANCELLED:
                    throw new common_1.BadRequestException('Cannot update a flash sale that is ENDED or CANCELLED');
            }
        }
        catch (error) {
            console.log('/flashsale/:id', error);
            throw error;
        }
    }
    async updateFlashSaleStatus({ id, status, updatedById, }) {
        try {
            const flashSale = await this.flashSaleRepository.findById(id);
            switch (flashSale.status) {
                case flash_sale_constant_1.FLASH_SALE_STATUS.DRAFT:
                case flash_sale_constant_1.FLASH_SALE_STATUS.SCHEDULED:
                    if (status === flash_sale_constant_1.FLASH_SALE_STATUS.DRAFT ||
                        status === flash_sale_constant_1.FLASH_SALE_STATUS.SCHEDULED) {
                        this.flashSaleService.validateFlashSaleTime(flashSale.startAt, flashSale.endAt);
                    }
                    break;
                case flash_sale_constant_1.FLASH_SALE_STATUS.LIVE:
                case flash_sale_constant_1.FLASH_SALE_STATUS.ENDED:
                case flash_sale_constant_1.FLASH_SALE_STATUS.CANCELLED:
                    throw new common_1.ForbiddenException('Cannot update ENDED or CANCELLED flash sale');
            }
            return this.flashSaleRepository.update({
                id,
                updatedById,
                data: {
                    status,
                },
            });
        }
        catch (error) {
            console.log('/flashsale/:id/status', error);
            throw error;
        }
    }
    async addItem({ id, data, createdById, }) {
        const flashSale = await this.flashSaleRepository.findById(id);
        if (!flashSale) {
            throw errors_1.NotFoundRecordException;
        }
        const skuIds = data.map((d) => d.skuId);
        const skus = await this.commonSKURepository.findManySKU({
            ids: skuIds,
            createdById,
        });
        const skuMap = new Map(skus.map((s) => [s.id, s]));
        for (const item of data) {
            const sku = skuMap.get(item.skuId);
            if (!sku) {
                throw new Error(`SKU with id ${item.skuId} does not exist or is not accessible`);
            }
            if (item.stock > sku.quantity) {
                throw new Error(`Insufficient stock for SKU ${item.skuId}. Requested: ${item.stock}, Available: ${sku.quantity}`);
            }
        }
        return this.flashSaleItemRepository.createMany({ id, createdById, data });
    }
    async getValidFlashSaleOrThrow({ id, itemId, createdById, }) {
        const [flashSale, flashSaleItem] = await Promise.all([
            await this.flashSaleRepository.findById(id),
            await this.flashSaleItemRepository.findBySellerById({
                id: itemId,
                createdById,
            }),
        ]);
        if (!flashSale || !flashSaleItem) {
            throw errors_1.NotFoundRecordException;
        }
        const allowedStatuses = [
            flash_sale_constant_1.FLASH_SALE_STATUS.SCHEDULED,
            flash_sale_constant_1.FLASH_SALE_STATUS.LIVE,
        ];
        if (!allowedStatuses.includes(flashSale.status)) {
            throw new common_1.ForbiddenException(`Flash sale must be SCHEDULED or LIVE, current: ${flashSale.status}`);
        }
        return flashSale;
    }
    async updateItem({ id, itemId, data, updatedById, }) {
        try {
            await this.getValidFlashSaleOrThrow({
                id,
                itemId,
                createdById: updatedById,
            });
            return this.flashSaleItemRepository.update({ id, data, updatedById });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteItem({ id, itemId, deletedById, }) {
        try {
            await this.getValidFlashSaleOrThrow({
                id,
                itemId,
                createdById: deletedById,
            });
            await this.flashSaleItemRepository.delete({ id, deletedById }, true);
            return { message: 'Delete flashsale item successfully' };
        }
        catch (error) {
            console.log('/flashsale/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.FlashsaleSellerService = FlashsaleSellerService;
exports.FlashsaleSellerService = FlashsaleSellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [flashsale_repository_1.FlashSaleRepository,
        flashsale_item_repository_1.FlashSaleItemRepository,
        common_sku_repository_1.CommonSKURepository,
        flashsale_service_1.FlashSaleService])
], FlashsaleSellerService);
//# sourceMappingURL=flashsale-seller.service.js.map