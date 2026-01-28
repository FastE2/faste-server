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
exports.AddressShipController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const request_dto_1 = require("../../common/dtos/request.dto");
const address_ship_service_1 = require("./address-ship.service");
const address_ship_dto_1 = require("./address-ship.dto");
let AddressShipController = class AddressShipController {
    addressShipService;
    constructor(addressShipService) {
        this.addressShipService = addressShipService;
    }
    getAllAddressShips(query, userId) {
        return this.addressShipService.getAllAddressShips(userId, query);
    }
    createAddressShip(body, userId) {
        return this.addressShipService.createAddressShip({
            data: body,
            userId,
        });
    }
    getAddressShipById(params, userId) {
        return this.addressShipService.getAddressShipById(userId, params.id);
    }
    getAddressShipByIdIsDefault(params) {
        return this.addressShipService.getAddressShipByIdIsDefault(params.id);
    }
    updateAddressShip(body, params, userId) {
        return this.addressShipService.updateAddressShip({
            id: params.id,
            data: body,
            userId,
        });
    }
    deleteAddressShip(params, userId) {
        return this.addressShipService.deleteAddressShip({
            id: params.id,
            userId,
        });
    }
};
exports.AddressShipController = AddressShipController;
__decorate([
    (0, common_1.Get)(),
    (0, nestjs_zod_1.ZodSerializerDto)(address_ship_dto_1.GetAddressShipResDTO),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.PaginationQueryDTO, Number]),
    __metadata("design:returntype", void 0)
], AddressShipController.prototype, "getAllAddressShips", null);
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_zod_1.ZodSerializerDto)(address_ship_dto_1.CreateAddressShipResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_ship_dto_1.CreateAddressShipBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], AddressShipController.prototype, "createAddressShip", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(address_ship_dto_1.GetAddressShipByIdResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], AddressShipController.prototype, "getAddressShipById", null);
__decorate([
    (0, common_1.Get)('/default/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(address_ship_dto_1.GetAddressShipByIdResDTO),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], AddressShipController.prototype, "getAddressShipByIdIsDefault", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(address_ship_dto_1.UpdateAddressShipResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_ship_dto_1.UpdateAddressShipBodyDTO,
        request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], AddressShipController.prototype, "updateAddressShip", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], AddressShipController.prototype, "deleteAddressShip", null);
exports.AddressShipController = AddressShipController = __decorate([
    (0, common_1.Controller)('address-ship'),
    __metadata("design:paramtypes", [address_ship_service_1.AddressShipService])
], AddressShipController);
//# sourceMappingURL=address-ship.controller.js.map