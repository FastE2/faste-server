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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Strategy = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const validate_env_1 = __importDefault(require("../../../common/configs/validate-env"));
const mime_types_1 = __importDefault(require("mime-types"));
const lib_storage_1 = require("@aws-sdk/lib-storage");
const random_file_name_helper_1 = require("../../../common/helpers/random-file-name.helper");
let S3Strategy = class S3Strategy {
    client;
    bucket;
    constructor() {
        this.bucket = validate_env_1.default.AWS_S3_PUBLIC_BUCKET;
        this.client = new client_s3_1.S3Client({
            region: validate_env_1.default.AWS_S3_REGION,
            credentials: {
                accessKeyId: validate_env_1.default.AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: validate_env_1.default.AWS_S3_SECRET_ACCESS_KEY,
            },
        });
    }
    async uploadFile(file, isPublic) {
        const filename = (0, random_file_name_helper_1.generateRandomFilename)(file.originalname);
        const cmd = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: filename,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: isPublic ? 'public-read' : 'private',
        });
        try {
            await this.client.send(cmd);
            const url = isPublic
                ? `https://${this.bucket}.s3.amazonaws.com/${filename}`
                : await this.getPresignedUrl(filename);
            return { filename, url };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('S3 upload error: ' + err.message);
        }
    }
    async uploadFileMutiple(file, isPublic) {
        const filename = (0, random_file_name_helper_1.generateRandomFilename)(file.originalname.split('.')[0]);
        try {
            const upload = new lib_storage_1.Upload({
                client: this.client,
                params: {
                    Bucket: this.bucket,
                    Key: filename,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    ACL: isPublic ? 'public-read' : 'private',
                },
                queueSize: 4,
                partSize: 5 * 1024 * 1024,
                leavePartsOnError: false,
            });
            await upload.done();
            const url = isPublic
                ? `https://${this.bucket}.s3.amazonaws.com/${filename}`
                : await this.getPresignedUrl(filename);
            return { filename, url };
        }
        catch (err) {
            console.log('upload', err.message);
            throw new common_1.InternalServerErrorException('S3 multipart upload error');
        }
    }
    async deleteFile(filename) {
        const cmd = new client_s3_1.DeleteObjectCommand({ Bucket: this.bucket, Key: filename });
        await this.client.send(cmd);
        return { message: 'Delete successfully' };
    }
    async getPresignedUrl(filename) {
        const cmd = new client_s3_1.GetObjectCommand({ Bucket: this.bucket, Key: filename });
        return await (0, s3_request_presigner_1.getSignedUrl)(this.client, cmd, { expiresIn: 60 });
    }
    async getAllImages({ page = 1, limit = 10, prefix = '', }) {
        let continuationToken = undefined;
        let currentPage = 1;
        let images = [];
        do {
            const cmd = new client_s3_1.ListObjectsV2Command({
                Bucket: this.bucket,
                Prefix: prefix,
                ContinuationToken: continuationToken,
                MaxKeys: limit,
            });
            const response = await this.client.send(cmd);
            console.log(response);
            if (response.Contents) {
                const filtered = response.Contents.filter((item) => item.Key && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.Key)).map((item) => ({
                    url: `https://${this.bucket}.s3.amazonaws.com/${item.Key}`,
                    fileSize: item.Size,
                    createdAt: item.LastModified,
                }));
                if (currentPage === page) {
                    images = filtered;
                    break;
                }
            }
            continuationToken = response.IsTruncated
                ? response.NextContinuationToken
                : undefined;
            currentPage++;
        } while (continuationToken);
        return images;
    }
    async createPresignedUrlWithClient(filename) {
        const contentType = mime_types_1.default.lookup(filename) || 'application/octet-stream';
        const cmd = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: filename,
            ContentType: contentType,
        });
        return await (0, s3_request_presigner_1.getSignedUrl)(this.client, cmd, { expiresIn: 30 });
    }
};
exports.S3Strategy = S3Strategy;
exports.S3Strategy = S3Strategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Strategy);
//# sourceMappingURL=s3.strategy.js.map