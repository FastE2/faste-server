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
exports.ProvincesController = void 0;
const common_1 = require("@nestjs/common");
const provinces_dto_1 = require("./provinces.dto");
const provinces_service_1 = require("./provinces.service");
let ProvincesController = class ProvincesController {
    provincesService;
    constructor(provincesService) {
        this.provincesService = provincesService;
    }
    getStates(countryCode, query) {
        return this.provincesService.getStates(countryCode, query);
    }
    getStateById(params) {
        return this.provincesService.getStateById(params.countryCode, params.id);
    }
    getCities(countryCode, query) {
        return this.provincesService.getCities(countryCode, query);
    }
    getCityById(params) {
        return this.provincesService.getCityById(params.countryCode, params.id);
    }
    getDistricts(countryCode, query) {
        return this.provincesService.getDistricts(countryCode, query);
    }
    getDistrictById(params) {
        return this.provincesService.getDistrictById(params.countryCode, params.id);
    }
    getWards(countryCode, query) {
        return this.provincesService.getWards(countryCode, query);
    }
    getWardById(params) {
        return this.provincesService.getWardById(params.countryCode, params.id);
    }
    getCountryById(countryCode) {
        return this.provincesService.getCountryById(countryCode);
    }
};
exports.ProvincesController = ProvincesController;
__decorate([
    (0, common_1.Get)(':countryCode/s'),
    __param(0, (0, common_1.Param)('countryCode')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, provinces_dto_1.QueryProvincesDTO]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "getStates", null);
__decorate([
    (0, common_1.Get)(':countryCode/s/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provinces_dto_1.GetParamsProvincesDTO]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "getStateById", null);
__decorate([
    (0, common_1.Get)(':countryCode/c'),
    __param(0, (0, common_1.Param)('countryCode')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, provinces_dto_1.QueryProvincesDTO]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "getCities", null);
__decorate([
    (0, common_1.Get)(':countryCode/c/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provinces_dto_1.GetParamsProvincesDTO]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "getCityById", null);
__decorate([
    (0, common_1.Get)(':countryCode/d'),
    __param(0, (0, common_1.Param)('countryCode')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, provinces_dto_1.QueryProvincesDTO]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "getDistricts", null);
__decorate([
    (0, common_1.Get)(':countryCode/d/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provinces_dto_1.GetParamsProvincesDTO]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "getDistrictById", null);
__decorate([
    (0, common_1.Get)(':countryCode/w'),
    __param(0, (0, common_1.Param)('countryCode')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, provinces_dto_1.QueryProvincesDTO]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "getWards", null);
__decorate([
    (0, common_1.Get)(':countryCode/w/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provinces_dto_1.GetParamsProvincesDTO]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "getWardById", null);
__decorate([
    (0, common_1.Get)('/:countryCode'),
    __param(0, (0, common_1.Param)('countryCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "getCountryById", null);
exports.ProvincesController = ProvincesController = __decorate([
    (0, common_1.Controller)('provinces'),
    __metadata("design:paramtypes", [provinces_service_1.ProvincesService])
], ProvincesController);
//# sourceMappingURL=provinces.controller.js.map