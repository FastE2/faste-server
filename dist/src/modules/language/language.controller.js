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
exports.LanguageController = void 0;
const common_1 = require("@nestjs/common");
const language_service_1 = require("./language.service");
const request_dto_1 = require("../../common/dtos/request.dto");
const language_dto_1 = require("./language.dto");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
let LanguageController = class LanguageController {
    languageService;
    constructor(languageService) {
        this.languageService = languageService;
    }
    findAllLanguages() {
        return this.languageService.findAll();
    }
    findOneLanguage(params) {
        return this.languageService.findOne(params);
    }
    createLanguage(body, userId) {
        return this.languageService.create(body, userId);
    }
    updateLanguage(params, body, userId) {
        return this.languageService.update(params.id, body, userId);
    }
    deleteLanguage(params, userId) {
        return this.languageService.delete({ id: params.id, deletedById: userId });
    }
};
exports.LanguageController = LanguageController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LanguageController.prototype, "findAllLanguages", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], LanguageController.prototype, "findOneLanguage", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [language_dto_1.CreateLanguageBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], LanguageController.prototype, "createLanguage", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO,
        language_dto_1.UpdateLanguageBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], LanguageController.prototype, "updateLanguage", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], LanguageController.prototype, "deleteLanguage", null);
exports.LanguageController = LanguageController = __decorate([
    (0, common_1.Controller)('language'),
    __metadata("design:paramtypes", [language_service_1.LanguageService])
], LanguageController);
//# sourceMappingURL=language.controller.js.map