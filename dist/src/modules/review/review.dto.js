"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReviewReplyBodyDTO = exports.CreateReviewReplyBodyDTO = exports.ReviewQueryDTO = exports.UpdateReviewResDTO = exports.CreateReviewResDTO = exports.GetReviewByIdResDTO = exports.GetReviewResDTO = exports.UpdateReviewBodyDTO = exports.CreateReviewBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const review_schema_1 = require("./review.schema");
class CreateReviewBodyDTO extends (0, nestjs_zod_1.createZodDto)(review_schema_1.CreateReviewBodySchema) {
}
exports.CreateReviewBodyDTO = CreateReviewBodyDTO;
class UpdateReviewBodyDTO extends (0, nestjs_zod_1.createZodDto)(review_schema_1.UpdateReviewBodySchema) {
}
exports.UpdateReviewBodyDTO = UpdateReviewBodyDTO;
class GetReviewResDTO extends (0, nestjs_zod_1.createZodDto)(review_schema_1.GetReviewResSchema) {
}
exports.GetReviewResDTO = GetReviewResDTO;
class GetReviewByIdResDTO extends (0, nestjs_zod_1.createZodDto)(review_schema_1.GetReviewByIdResSchema) {
}
exports.GetReviewByIdResDTO = GetReviewByIdResDTO;
class CreateReviewResDTO extends (0, nestjs_zod_1.createZodDto)(review_schema_1.CreateReviewResSchema) {
}
exports.CreateReviewResDTO = CreateReviewResDTO;
class UpdateReviewResDTO extends (0, nestjs_zod_1.createZodDto)(review_schema_1.UpdateReviewResSchema) {
}
exports.UpdateReviewResDTO = UpdateReviewResDTO;
class ReviewQueryDTO extends (0, nestjs_zod_1.createZodDto)(review_schema_1.ReviewQuerySchema) {
}
exports.ReviewQueryDTO = ReviewQueryDTO;
class CreateReviewReplyBodyDTO extends (0, nestjs_zod_1.createZodDto)(review_schema_1.CreateReviewReplyBodySchema) {
}
exports.CreateReviewReplyBodyDTO = CreateReviewReplyBodyDTO;
class UpdateReviewReplyBodyDTO extends (0, nestjs_zod_1.createZodDto)(review_schema_1.UpdateReviewReplyBodySchema) {
}
exports.UpdateReviewReplyBodyDTO = UpdateReviewReplyBodyDTO;
//# sourceMappingURL=review.dto.js.map