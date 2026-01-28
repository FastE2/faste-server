"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBrandResDTO = exports.CreateBrandResDTO = exports.GetBrandByIdResDTO = exports.GetBrandResDTO = exports.UpdateBrandBodyDTO = exports.CreateBrandBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const brand_schema_1 = require("./brand.schema");
class CreateBrandBodyDTO extends (0, nestjs_zod_1.createZodDto)(brand_schema_1.CreateBrandBodySchema) {
}
exports.CreateBrandBodyDTO = CreateBrandBodyDTO;
class UpdateBrandBodyDTO extends (0, nestjs_zod_1.createZodDto)(brand_schema_1.UpdateBrandBodySchema) {
}
exports.UpdateBrandBodyDTO = UpdateBrandBodyDTO;
class GetBrandResDTO extends (0, nestjs_zod_1.createZodDto)(brand_schema_1.GetBrandResSchema) {
}
exports.GetBrandResDTO = GetBrandResDTO;
class GetBrandByIdResDTO extends (0, nestjs_zod_1.createZodDto)(brand_schema_1.GetBrandByIdResSchema) {
}
exports.GetBrandByIdResDTO = GetBrandByIdResDTO;
class CreateBrandResDTO extends (0, nestjs_zod_1.createZodDto)(brand_schema_1.CreateBrandResSchema) {
}
exports.CreateBrandResDTO = CreateBrandResDTO;
class UpdateBrandResDTO extends (0, nestjs_zod_1.createZodDto)(brand_schema_1.UpdateBrandResSchema) {
}
exports.UpdateBrandResDTO = UpdateBrandResDTO;
//# sourceMappingURL=brand.dto.js.map