"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLanguageBodyDTO = exports.CreateLanguageBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const language_schema_1 = require("./language.schema");
class CreateLanguageBodyDTO extends (0, nestjs_zod_1.createZodDto)(language_schema_1.CreateLanguageBodySchema) {
}
exports.CreateLanguageBodyDTO = CreateLanguageBodyDTO;
class UpdateLanguageBodyDTO extends (0, nestjs_zod_1.createZodDto)(language_schema_1.UpdateLanguageBodySchema) {
}
exports.UpdateLanguageBodyDTO = UpdateLanguageBodyDTO;
//# sourceMappingURL=language.dto.js.map