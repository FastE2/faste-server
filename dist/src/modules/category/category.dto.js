"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryResDTO = exports.CreateCategoryResDTO = exports.GetCategoryByIdResDTO = exports.GetCategoryResDTO = exports.UpdateCategoryBodyDTO = exports.CreateCategoryBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const category_schema_1 = require("./category.schema");
class CreateCategoryBodyDTO extends (0, nestjs_zod_1.createZodDto)(category_schema_1.CreateCategoryBodySchema) {
}
exports.CreateCategoryBodyDTO = CreateCategoryBodyDTO;
class UpdateCategoryBodyDTO extends (0, nestjs_zod_1.createZodDto)(category_schema_1.UpdateCategoryBodySchema) {
}
exports.UpdateCategoryBodyDTO = UpdateCategoryBodyDTO;
class GetCategoryResDTO extends (0, nestjs_zod_1.createZodDto)(category_schema_1.GetCategoryResSchema) {
}
exports.GetCategoryResDTO = GetCategoryResDTO;
class GetCategoryByIdResDTO extends (0, nestjs_zod_1.createZodDto)(category_schema_1.GetCategoryByIdResSchema) {
}
exports.GetCategoryByIdResDTO = GetCategoryByIdResDTO;
class CreateCategoryResDTO extends (0, nestjs_zod_1.createZodDto)(category_schema_1.CreateCategoryResSchema) {
}
exports.CreateCategoryResDTO = CreateCategoryResDTO;
class UpdateCategoryResDTO extends (0, nestjs_zod_1.createZodDto)(category_schema_1.UpdateCategoryResSchema) {
}
exports.UpdateCategoryResDTO = UpdateCategoryResDTO;
//# sourceMappingURL=category.dto.js.map