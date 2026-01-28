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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashsaleClientController = void 0;
const common_1 = require("@nestjs/common");
const flashsale_client_service_1 = require("./flashsale-client.service");
const request_dto_1 = require("../../../common/dtos/request.dto");
const auth_decorator_1 = require("../../../common/decorators/auth.decorator");
let FlashsaleClientController = class FlashsaleClientController {
    flashSaleClientService;
    constructor(flashSaleClientService) {
        this.flashSaleClientService = flashSaleClientService;
    }
    getActive(query) {
        return this.flashSaleClientService.findActive(query);
    }
    getUpcoming(query) {
        return this.flashSaleClientService.findUpcoming(query);
    }
    getOne(params) {
        return this.flashSaleClientService.findOne(params.id);
    }
    getItems(params, query) {
        return this.flashSaleClientService.findItems({ query, id: params.id });
    }
};
exports.FlashsaleClientController = FlashsaleClientController;
__decorate([
    (0, common_1.Get)(''),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.PaginationQueryDTO]),
    __metadata("design:returntype", void 0)
], FlashsaleClientController.prototype, "getActive", null);
__decorate([
    (0, common_1.Get)('upcoming'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.PaginationQueryDTO]),
    __metadata("design:returntype", void 0)
], FlashsaleClientController.prototype, "getUpcoming", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], FlashsaleClientController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)(':id/items'),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, request_dto_1.PaginationQueryDTO]),
    __metadata("design:returntype", void 0)
], FlashsaleClientController.prototype, "getItems", null);
exports.FlashsaleClientController = FlashsaleClientController = __decorate([
    (0, common_1.Controller)('flashsales'),
    __metadata("design:paramtypes", [flashsale_client_service_1.FlashsaleClientService])
], FlashsaleClientController);
//# sourceMappingURL=flashsale-client.controller.js.map