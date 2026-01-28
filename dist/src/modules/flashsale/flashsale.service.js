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
exports.FlashSaleService = void 0;
const common_1 = require("@nestjs/common");
const flash_sale_constant_1 = require("../../common/constants/flash-sale.constant");
let FlashSaleService = class FlashSaleService {
    constructor() { }
    validateFlashSaleTime(startAt, endAt) {
        const now = Date.now();
        if (startAt.getTime() < now) {
            throw new common_1.BadRequestException('Start time must be in the future');
        }
        if (endAt.getTime() < startAt.getTime()) {
            throw new common_1.BadRequestException('End time must be after start time');
        }
    }
    determineInitialStatus(startAt, endAt) {
        const now = new Date();
        if (endAt <= now)
            return flash_sale_constant_1.FLASH_SALE_STATUS.ENDED;
        if (startAt > now)
            return flash_sale_constant_1.FLASH_SALE_STATUS.SCHEDULED;
        return flash_sale_constant_1.FLASH_SALE_STATUS.LIVE;
    }
};
exports.FlashSaleService = FlashSaleService;
exports.FlashSaleService = FlashSaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FlashSaleService);
//# sourceMappingURL=flashsale.service.js.map