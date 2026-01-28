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
exports.FlashsaleClientService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../../common/errors");
const flashsale_repository_1 = require("../flashsale.repository");
const flash_sale_constant_1 = require("../../../common/constants/flash-sale.constant");
const flashsale_item_repository_1 = require("../flashsale-item.repository");
let FlashsaleClientService = class FlashsaleClientService {
    flashSaleRepository;
    flashSaleItemRepository;
    constructor(flashSaleRepository, flashSaleItemRepository) {
        this.flashSaleRepository = flashSaleRepository;
        this.flashSaleItemRepository = flashSaleItemRepository;
    }
    async findActive(query) {
        try {
            const { page, limit } = query;
            return await this.flashSaleRepository.list({
                limit,
                page,
                status: flash_sale_constant_1.FLASH_SALE_STATUS.LIVE,
            });
        }
        catch (error) {
            console.log('/flashsales', error);
            throw error;
        }
    }
    async findUpcoming(query) {
        try {
            const { page, limit } = query;
            return await this.flashSaleRepository.list({
                limit,
                page,
                status: flash_sale_constant_1.FLASH_SALE_STATUS.SCHEDULED,
            });
        }
        catch (error) {
            console.log('/flashsales/upcoming', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const flashSale = await this.flashSaleRepository.findById(id);
            if (!flashSale) {
                throw errors_1.NotFoundRecordException;
            }
            return flashSale;
        }
        catch (error) {
            console.log('/flashsales/:id', error);
            throw error;
        }
    }
    async findItems({ id, query }) {
        try {
            const flashSale = await this.flashSaleItemRepository.list(query, id);
            if (!flashSale) {
                throw errors_1.NotFoundRecordException;
            }
            return flashSale;
        }
        catch (error) {
            console.log('/flashsales/:id/items', error);
            throw error;
        }
    }
};
exports.FlashsaleClientService = FlashsaleClientService;
exports.FlashsaleClientService = FlashsaleClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [flashsale_repository_1.FlashSaleRepository,
        flashsale_item_repository_1.FlashSaleItemRepository])
], FlashsaleClientService);
//# sourceMappingURL=flashsale-client.service.js.map