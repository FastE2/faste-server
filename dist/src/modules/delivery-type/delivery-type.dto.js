"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeliveryTypeResDTO = exports.CreateDeliveryTypeResDTO = exports.GetDeliveryTypeByIdResDTO = exports.GetDeliveryTypeResDTO = exports.UpdateDeliveryTypeBodyDTO = exports.CreateDeliveryTypeBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const delivery_type_schema_1 = require("./delivery-type.schema");
class CreateDeliveryTypeBodyDTO extends (0, nestjs_zod_1.createZodDto)(delivery_type_schema_1.CreateDeliveryTypeBodySchema) {
}
exports.CreateDeliveryTypeBodyDTO = CreateDeliveryTypeBodyDTO;
class UpdateDeliveryTypeBodyDTO extends (0, nestjs_zod_1.createZodDto)(delivery_type_schema_1.UpdateDeliveryTypeBodySchema) {
}
exports.UpdateDeliveryTypeBodyDTO = UpdateDeliveryTypeBodyDTO;
class GetDeliveryTypeResDTO extends (0, nestjs_zod_1.createZodDto)(delivery_type_schema_1.GetDeliveryTypeResSchema) {
}
exports.GetDeliveryTypeResDTO = GetDeliveryTypeResDTO;
class GetDeliveryTypeByIdResDTO extends (0, nestjs_zod_1.createZodDto)(delivery_type_schema_1.GetDeliveryTypeByIdResSchema) {
}
exports.GetDeliveryTypeByIdResDTO = GetDeliveryTypeByIdResDTO;
class CreateDeliveryTypeResDTO extends (0, nestjs_zod_1.createZodDto)(delivery_type_schema_1.CreateDeliveryTypeResSchema) {
}
exports.CreateDeliveryTypeResDTO = CreateDeliveryTypeResDTO;
class UpdateDeliveryTypeResDTO extends (0, nestjs_zod_1.createZodDto)(delivery_type_schema_1.UpdateDeliveryTypeResSchema) {
}
exports.UpdateDeliveryTypeResDTO = UpdateDeliveryTypeResDTO;
//# sourceMappingURL=delivery-type.dto.js.map