"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManyWidgetsDTO = exports.UpdateWidgetBodyDTO = exports.CreateWidgetBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const widget_schema_1 = require("./widget.schema");
class CreateWidgetBodyDTO extends (0, nestjs_zod_1.createZodDto)(widget_schema_1.CreateWidgetBodySchema) {
}
exports.CreateWidgetBodyDTO = CreateWidgetBodyDTO;
class UpdateWidgetBodyDTO extends (0, nestjs_zod_1.createZodDto)(widget_schema_1.UpdateWidgetBodySchema) {
}
exports.UpdateWidgetBodyDTO = UpdateWidgetBodyDTO;
class UpdateManyWidgetsDTO extends (0, nestjs_zod_1.createZodDto)(widget_schema_1.UpdateManyWidgetsSchema) {
}
exports.UpdateManyWidgetsDTO = UpdateManyWidgetsDTO;
//# sourceMappingURL=widget.dto.js.map