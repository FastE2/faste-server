"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParamSlugDTO = exports.RegisterShopBodyDTO = exports.UpdateShopResDTO = exports.CreateShopResDTO = exports.GetShopByIdResDTO = exports.GetShopResDTO = exports.UpdateShopBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const shop_schema_1 = require("./shop.schema");
class UpdateShopBodyDTO extends (0, nestjs_zod_1.createZodDto)(shop_schema_1.UpdateShopBodySchema) {
}
exports.UpdateShopBodyDTO = UpdateShopBodyDTO;
class GetShopResDTO extends (0, nestjs_zod_1.createZodDto)(shop_schema_1.GetShopResSchema) {
}
exports.GetShopResDTO = GetShopResDTO;
class GetShopByIdResDTO extends (0, nestjs_zod_1.createZodDto)(shop_schema_1.GetShopByIdResSchema) {
}
exports.GetShopByIdResDTO = GetShopByIdResDTO;
class CreateShopResDTO extends (0, nestjs_zod_1.createZodDto)(shop_schema_1.CreateShopResSchema) {
}
exports.CreateShopResDTO = CreateShopResDTO;
class UpdateShopResDTO extends (0, nestjs_zod_1.createZodDto)(shop_schema_1.UpdateShopResSchema) {
}
exports.UpdateShopResDTO = UpdateShopResDTO;
class RegisterShopBodyDTO extends (0, nestjs_zod_1.createZodDto)(shop_schema_1.RegisterShopBodySchema) {
}
exports.RegisterShopBodyDTO = RegisterShopBodyDTO;
class GetParamSlugDTO extends (0, nestjs_zod_1.createZodDto)(shop_schema_1.GetParamSlugSchema) {
}
exports.GetParamSlugDTO = GetParamSlugDTO;
//# sourceMappingURL=shop.dto.js.map