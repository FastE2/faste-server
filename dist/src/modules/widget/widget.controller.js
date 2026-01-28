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
exports.WidgetController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const request_dto_1 = require("../../common/dtos/request.dto");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const widget_service_1 = require("./widget.service");
const widget_dto_1 = require("./widget.dto");
let WidgetController = class WidgetController {
    widgetService;
    constructor(widgetService) {
        this.widgetService = widgetService;
    }
    getAllWidgets(templateId, userId) {
        return this.widgetService.getAllWidgetsByTemplate(Number(templateId), userId);
    }
    getAllWidgetsByTemplateIsPublic(templateId) {
        return this.widgetService.getAllWidgetsByTemplateIsPublic(templateId);
    }
    createWidget(body, userId) {
        return this.widgetService.createWidget({
            data: body,
            createdById: userId,
        });
    }
    getWidgetId(params) {
        return this.widgetService.getWidgetId(params.id);
    }
    updateWidget(body, params, userId) {
        return this.widgetService.updateWidget({
            id: params.id,
            data: body,
            updatedById: userId,
        });
    }
    updateManyWidgets(templateId, body, userId) {
        return this.widgetService.updateWidgets(Number(templateId), body);
    }
    deleteWidget(params, userId) {
        return this.widgetService.deleteWidget({
            id: params.id,
            deletedById: userId,
        });
    }
};
exports.WidgetController = WidgetController;
__decorate([
    (0, common_1.Get)('/template/:templateId'),
    __param(0, (0, common_1.Param)('templateId')),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "getAllWidgets", null);
__decorate([
    (0, common_1.Get)('/template/:templateId/public'),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Param)('templateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "getAllWidgetsByTemplateIsPublic", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [widget_dto_1.CreateWidgetBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "createWidget", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "getWidgetId", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [widget_dto_1.UpdateWidgetBodyDTO,
        request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "updateWidget", null);
__decorate([
    (0, common_1.Patch)('template/:templateId'),
    __param(0, (0, common_1.Param)('templateId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, widget_dto_1.UpdateManyWidgetsDTO, Number]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "updateManyWidgets", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "deleteWidget", null);
exports.WidgetController = WidgetController = __decorate([
    (0, common_1.Controller)('widget'),
    __metadata("design:paramtypes", [widget_service_1.WidgetService])
], WidgetController);
//# sourceMappingURL=widget.controller.js.map