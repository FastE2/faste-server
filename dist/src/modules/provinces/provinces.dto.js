"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProvincesDTO = exports.GetParamsProvincesDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const provinces_schema_1 = require("./provinces.schema");
class GetParamsProvincesDTO extends (0, nestjs_zod_1.createZodDto)(provinces_schema_1.GetParamsProvincesSchema) {
}
exports.GetParamsProvincesDTO = GetParamsProvincesDTO;
class QueryProvincesDTO extends (0, nestjs_zod_1.createZodDto)(provinces_schema_1.QueryProvincesSchema) {
}
exports.QueryProvincesDTO = QueryProvincesDTO;
//# sourceMappingURL=provinces.dto.js.map