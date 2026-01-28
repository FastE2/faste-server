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
exports.TemplateController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const request_dto_1 = require("../../common/dtos/request.dto");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const template_dto_1 = require("./template.dto");
const template_service_1 = require("./template.service");
let TemplateController = class TemplateController {
    templateService;
    constructor(templateService) {
        this.templateService = templateService;
    }
    getAllTemplates(query) {
        return this.templateService.getAllTemplates(query);
    }
    getAllTemplatesByShop(query, userId) {
        return this.templateService.getAllTemplatesByShop(query, userId);
    }
    createBrand(body, userId) {
        return this.templateService.createTemplate({
            data: body,
            createdById: userId,
        });
    }
    getTemplateIdIsPublic(params) {
        return this.templateService.getTemplateIdIsPublic(params.id);
    }
    updateBrand(body, params, userId) {
        return this.templateService.updateTemplate({
            id: params.id,
            data: body,
            updatedById: userId,
        });
    }
    deleteBrand(params, userId) {
        return this.templateService.deleteTemplate({
            id: params.id,
            deletedById: userId,
        });
    }
};
exports.TemplateController = TemplateController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.PaginationQueryDTO]),
    __metadata("design:returntype", void 0)
], TemplateController.prototype, "getAllTemplates", null);
__decorate([
    (0, common_1.Get)('/seller'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.PaginationQueryDTO, Number]),
    __metadata("design:returntype", void 0)
], TemplateController.prototype, "getAllTemplatesByShop", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [template_dto_1.CreateTemplateBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], TemplateController.prototype, "createBrand", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], TemplateController.prototype, "getTemplateIdIsPublic", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [template_dto_1.UpdateTemplateBodyDTO,
        request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], TemplateController.prototype, "updateBrand", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], TemplateController.prototype, "deleteBrand", null);
exports.TemplateController = TemplateController = __decorate([
    (0, common_1.Controller)('template'),
    __metadata("design:paramtypes", [template_service_1.TemplateService])
], TemplateController);
//# sourceMappingURL=template.controller.js.map