"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAddressShipResDTO = exports.CreateAddressShipResDTO = exports.GetAddressShipByIdResDTO = exports.GetAddressShipResDTO = exports.UpdateAddressShipBodyDTO = exports.CreateAddressShipBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const address_ship_schema_1 = require("./address-ship.schema");
class CreateAddressShipBodyDTO extends (0, nestjs_zod_1.createZodDto)(address_ship_schema_1.CreateAddressShipBodySchema) {
}
exports.CreateAddressShipBodyDTO = CreateAddressShipBodyDTO;
class UpdateAddressShipBodyDTO extends (0, nestjs_zod_1.createZodDto)(address_ship_schema_1.UpdateAddressShipBodySchema) {
}
exports.UpdateAddressShipBodyDTO = UpdateAddressShipBodyDTO;
class GetAddressShipResDTO extends (0, nestjs_zod_1.createZodDto)(address_ship_schema_1.GetAddressShipResSchema) {
}
exports.GetAddressShipResDTO = GetAddressShipResDTO;
class GetAddressShipByIdResDTO extends (0, nestjs_zod_1.createZodDto)(address_ship_schema_1.GetAddressShipByIdResSchema) {
}
exports.GetAddressShipByIdResDTO = GetAddressShipByIdResDTO;
class CreateAddressShipResDTO extends (0, nestjs_zod_1.createZodDto)(address_ship_schema_1.CreateAddressShipResSchema) {
}
exports.CreateAddressShipResDTO = CreateAddressShipResDTO;
class UpdateAddressShipResDTO extends (0, nestjs_zod_1.createZodDto)(address_ship_schema_1.UpdateAddressShipResSchema) {
}
exports.UpdateAddressShipResDTO = UpdateAddressShipResDTO;
//# sourceMappingURL=address-ship.dto.js.map