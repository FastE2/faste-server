"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTemplateBodyDTO = exports.CreateTemplateBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const template_schema_1 = require("./template.schema");
class CreateTemplateBodyDTO extends (0, nestjs_zod_1.createZodDto)(template_schema_1.CreateTemplateBodySchema) {
}
exports.CreateTemplateBodyDTO = CreateTemplateBodyDTO;
class UpdateTemplateBodyDTO extends (0, nestjs_zod_1.createZodDto)(template_schema_1.UpdateTemplateBodySchema) {
}
exports.UpdateTemplateBodyDTO = UpdateTemplateBodyDTO;
//# sourceMappingURL=template.dto.js.map