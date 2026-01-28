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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const media_constant_1 = require("../../common/constants/media.constant");
const random_file_name_helper_1 = require("../../common/helpers/random-file-name.helper");
const media_repository_1 = require("./media.repository");
let MediaService = class MediaService {
    storage;
    mediaRepository;
    constructor(storage, mediaRepository) {
        this.storage = storage;
        this.mediaRepository = mediaRepository;
    }
    async upload(file, isPublic = true, userId) {
        const { filename, url } = await this.storage.uploadFile(file, isPublic);
        return await this.mediaRepository.create({
            key: filename,
            type: 'IMAGE',
            size: file.size,
            url,
            isPublic,
            createdById: userId,
        });
    }
    async delete(key) {
        try {
            const result = await this.storage.deleteFile(key);
            if (!result.message) {
                throw new common_1.InternalServerErrorException('Delete file error');
            }
            await this.mediaRepository.delete(key);
            return result;
        }
        catch (error) {
            console.log('/media', error);
            throw error;
        }
    }
    getSignedUrl(key) {
        return this.storage.getPresignedUrl(key);
    }
    getPresignUrl(body) {
        if (body.filesize > media_constant_1.MAX_SIZE) {
            throw new common_1.BadRequestException('File size exceeds 1MB');
        }
        const randomFilename = (0, random_file_name_helper_1.generateRandomFilename)(body.filename);
        return this.storage.createPresignedUrlWithClient(randomFilename);
    }
    async getAllImagesInS3(query) {
        const data = await this.storage.getAllImages({
            page: query.page,
            limit: query.limit,
            prefix: '',
        });
        return {
            data,
            page: query.page,
            limit: query.limit,
        };
    }
    async getAllImagesInDB(query) {
        return await this.mediaRepository.list(query);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IStorageStrategy')),
    __metadata("design:paramtypes", [Object, media_repository_1.MediaRepository])
], MediaService);
//# sourceMappingURL=media.service.js.map