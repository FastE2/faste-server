"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProductPublicResDTO = exports.GetProductsQueryDTO = exports.UpdateProductBodyDTO = exports.UpdateCategoryBodyDTO = exports.GetParamSlugIdDTO = exports.CreateProductBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const product_schema_1 = require("./product.schema");
class CreateProductBodyDTO extends (0, nestjs_zod_1.createZodDto)(product_schema_1.CreateProductBodySchema) {
}
exports.CreateProductBodyDTO = CreateProductBodyDTO;
class GetParamSlugIdDTO extends (0, nestjs_zod_1.createZodDto)(product_schema_1.GetParamSlugIdSchema) {
}
exports.GetParamSlugIdDTO = GetParamSlugIdDTO;
class UpdateCategoryBodyDTO extends (0, nestjs_zod_1.createZodDto)(product_schema_1.UpdateCategoryBodySchema) {
}
exports.UpdateCategoryBodyDTO = UpdateCategoryBodyDTO;
class UpdateProductBodyDTO extends (0, nestjs_zod_1.createZodDto)(product_schema_1.UpdateProductBodySchema) {
}
exports.UpdateProductBodyDTO = UpdateProductBodyDTO;
class GetProductsQueryDTO extends (0, nestjs_zod_1.createZodDto)(product_schema_1.GetProductsQuerySchema) {
}
exports.GetProductsQueryDTO = GetProductsQueryDTO;
class GetAllProductPublicResDTO extends (0, nestjs_zod_1.createZodDto)(product_schema_1.GetAllProductPublicResSchema) {
}
exports.GetAllProductPublicResDTO = GetAllProductPublicResDTO;
//# sourceMappingURL=product.dto.js.map