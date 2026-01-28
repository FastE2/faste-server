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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const request_dto_1 = require("../../common/dtos/request.dto");
const review_service_1 = require("./review.service");
const review_dto_1 = require("./review.dto");
const active_role_permissions_decorator_1 = require("../../common/decorators/active-role-permissions.decorator");
let ReviewController = class ReviewController {
    reviewService;
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    getAllReviews(query) {
        return this.reviewService.getAllReviews(query);
    }
    getReviewById(params) {
        return this.reviewService.getReviewById(params.id);
    }
    createReview(body, userId) {
        return this.reviewService.createReview({
            data: body,
            userId,
        });
    }
    createReplyReview(body, userId) {
        return this.reviewService.createReview({
            data: body,
            userId,
        });
    }
    updateReview(params, body, userId) {
        return this.reviewService.updateReview({
            id: params.id,
            data: body,
            userId,
        });
    }
    deleteReview(params, userId, roleName) {
        return this.reviewService.deleteReview({
            id: params.id,
            userId,
            roleName,
        });
    }
    createReviewReply(params, userId, roleName, body) {
        return this.reviewService.createReviewReply({
            id: params.id,
            userId,
            roleName,
            data: body,
        });
    }
    updateReviewReply(params, userId, roleName, body) {
        return this.reviewService.updateReviewReply({
            id: params.id,
            userId,
            roleName,
            data: body,
        });
    }
    deleteReviewReply(params, userId, roleName) {
        return this.reviewService.deleteReviewReply({
            id: params.id,
            userId,
            roleName,
        });
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(review_dto_1.GetReviewResDTO),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.ReviewQueryDTO]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "getAllReviews", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(review_dto_1.GetReviewByIdResDTO),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "getReviewById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_zod_1.ZodSerializerDto)(review_dto_1.CreateReviewResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.CreateReviewBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "createReview", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.CreateReviewBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "createReplyReview", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(review_dto_1.UpdateReviewResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO,
        review_dto_1.UpdateReviewBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(2, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number, String]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Post)('reply/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(2, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number, String, review_dto_1.CreateReviewReplyBodyDTO]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "createReviewReply", null);
__decorate([
    (0, common_1.Put)('reply/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(2, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number, String, review_dto_1.UpdateReviewReplyBodyDTO]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "updateReviewReply", null);
__decorate([
    (0, common_1.Delete)('reply/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(2, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number, String]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "deleteReviewReply", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map