"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSearchDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const search_schema_1 = require("../search.schema");
class CreateProductSearchDTO extends (0, nestjs_zod_1.createZodDto)(search_schema_1.CreateProductSearchSchema) {
}
exports.CreateProductSearchDTO = CreateProductSearchDTO;
//# sourceMappingURL=create.dto.js.map