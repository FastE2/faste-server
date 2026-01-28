"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashsaleModule = void 0;
const common_1 = require("@nestjs/common");
const flashsale_admin_controller_1 = require("./admin/flashsale-admin.controller");
const flashsale_seller_controller_1 = require("./seller/flashsale-seller.controller");
const flashsale_client_controller_1 = require("./client/flashsale-client.controller");
const flashsale_service_1 = require("./flashsale.service");
const flashsale_admin_service_1 = require("./admin/flashsale-admin.service");
const flashsale_seller_service_1 = require("./seller/flashsale-seller.service");
const flashsale_client_service_1 = require("./client/flashsale-client.service");
const flashsale_repository_1 = require("./flashsale.repository");
const flashsale_item_repository_1 = require("./flashsale-item.repository");
let FlashsaleModule = class FlashsaleModule {
};
exports.FlashsaleModule = FlashsaleModule;
exports.FlashsaleModule = FlashsaleModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            flashsale_admin_controller_1.FlashsaleAdminController,
            flashsale_seller_controller_1.FlashsaleSellerController,
            flashsale_client_controller_1.FlashsaleClientController,
        ],
        providers: [
            flashsale_service_1.FlashSaleService,
            flashsale_admin_service_1.FlashsaleAdminService,
            flashsale_seller_service_1.FlashsaleSellerService,
            flashsale_client_service_1.FlashsaleClientService,
            flashsale_repository_1.FlashSaleRepository,
            flashsale_item_repository_1.FlashSaleItemRepository,
        ],
    })
], FlashsaleModule);
//# sourceMappingURL=flashsale.module.js.map