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
exports.FlashsaleAdminService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../../common/errors");
const prisma_1 = require("../../../common/errors/prisma");
const flashsale_repository_1 = require("../flashsale.repository");
const flash_sale_constant_1 = require("../../../common/constants/flash-sale.constant");
const flashsale_service_1 = require("../flashsale.service");
let FlashsaleAdminService = class FlashsaleAdminService {
    flashSaleRepository;
    flashSaleService;
    constructor(flashSaleRepository, flashSaleService) {
        this.flashSaleRepository = flashSaleRepository;
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
    async getFlashSaleById(id) {
        try {
            const flashSale = await this.flashSaleRepository.findById(id);
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
                    if (status !== flash_sale_constant_1.FLASH_SALE_STATUS.CANCELLED) {
                        throw new common_1.ForbiddenException('LIVE flash sale can only be cancelled');
                    }
                    break;
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
    async deleteFlashSale({ id, deletedById, }) {
        try {
            await this.flashSaleRepository.delete({ id, deletedById });
            return { message: 'Delete flashsale successfully' };
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
exports.FlashsaleAdminService = FlashsaleAdminService;
exports.FlashsaleAdminService = FlashsaleAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [flashsale_repository_1.FlashSaleRepository,
        flashsale_service_1.FlashSaleService])
], FlashsaleAdminService);
//# sourceMappingURL=flashsale-admin.service.js.map