"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMediasQueryDTO = exports.PresignedUploadFileBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const media_schema_1 = require("./media.schema");
const request_schema_1 = require("../../common/schemas/request.schema");
class PresignedUploadFileBodyDTO extends (0, nestjs_zod_1.createZodDto)(media_schema_1.PresignedUploadFileBodySchema) {
}
exports.PresignedUploadFileBodyDTO = PresignedUploadFileBodyDTO;
class GetMediasQueryDTO extends (0, nestjs_zod_1.createZodDto)(request_schema_1.PaginationQuerySchema) {
}
exports.GetMediasQueryDTO = GetMediasQueryDTO;
//# sourceMappingURL=media.dto.js.map