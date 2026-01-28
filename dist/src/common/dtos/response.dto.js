"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const response_schema_1 = require("../schemas/response.schema");
class MessageResDTO extends (0, nestjs_zod_1.createZodDto)(response_schema_1.MessageResSchema) {
}
exports.MessageResDTO = MessageResDTO;
//# sourceMappingURL=response.dto.js.map