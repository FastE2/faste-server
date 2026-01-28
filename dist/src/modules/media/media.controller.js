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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const media_service_1 = require("./media.service");
const media_dto_1 = require("./media.dto");
const nestjs_zod_1 = require("nestjs-zod");
const response_dto_1 = require("../../common/dtos/response.dto");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
let MediaController = class MediaController {
    mediaService;
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    uploadFile(file, isPublic, userId) {
        const isPublicBool = isPublic === 'true' ? true : false;
        return this.mediaService.upload(file, isPublicBool, userId);
    }
    delete(filename) {
        return this.mediaService.delete(filename);
    }
    getPresigned(filename) {
        return this.mediaService.getSignedUrl(filename);
    }
    GetAllImagesInS3(query) {
        return this.mediaService.getAllImagesInS3(query);
    }
    GetAllImagesInDB(query) {
        return this.mediaService.getAllImagesInDB(query);
    }
    createPresignedUrl(body) {
        return this.mediaService.getPresignUrl(body);
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
            new common_1.MaxFileSizeValidator({
                maxSize: 1 * 1024 * 1024,
                message: 'File is too large. Max file size is 1MB',
            }),
        ],
    }))),
    __param(1, (0, common_1.Body)('isPublic')),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)(':filename'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('presigned/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "getPresigned", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [media_dto_1.GetMediasQueryDTO]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "GetAllImagesInS3", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [media_dto_1.GetMediasQueryDTO]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "GetAllImagesInDB", null);
__decorate([
    (0, common_1.Post)('upload/presigned-url'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [media_dto_1.PresignedUploadFileBodyDTO]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "createPresignedUrl", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map