"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParamsDTO = exports.DeleteBodyDTO = exports.PaginationQueryDTO = exports.EmptyBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const request_schema_1 = require("../schemas/request.schema");
class EmptyBodyDTO extends (0, nestjs_zod_1.createZodDto)(request_schema_1.EmptyBodySchema) {
}
exports.EmptyBodyDTO = EmptyBodyDTO;
class PaginationQueryDTO extends (0, nestjs_zod_1.createZodDto)(request_schema_1.PaginationQuerySchema) {
}
exports.PaginationQueryDTO = PaginationQueryDTO;
class DeleteBodyDTO extends (0, nestjs_zod_1.createZodDto)(request_schema_1.DeleteBodySchema) {
}
exports.DeleteBodyDTO = DeleteBodyDTO;
class GetParamsDTO extends (0, nestjs_zod_1.createZodDto)(request_schema_1.GetParamsSchema) {
}
exports.GetParamsDTO = GetParamsDTO;
//# sourceMappingURL=request.dto.js.map