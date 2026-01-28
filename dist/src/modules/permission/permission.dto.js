"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePermissionResDTO = exports.GetPermissionByIdResDTO = exports.CreatePermissionResDTO = exports.GetPermissionsResDTO = exports.UpdatePermissionBodyDTO = exports.GetPermissionParamsDTO = exports.CreatePermissionBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const permission_schema_1 = require("./permission.schema");
class CreatePermissionBodyDTO extends (0, nestjs_zod_1.createZodDto)(permission_schema_1.CreatePermissionBodySchema) {
}
exports.CreatePermissionBodyDTO = CreatePermissionBodyDTO;
class GetPermissionParamsDTO extends (0, nestjs_zod_1.createZodDto)(permission_schema_1.GetPermissionParamsSchema) {
}
exports.GetPermissionParamsDTO = GetPermissionParamsDTO;
class UpdatePermissionBodyDTO extends (0, nestjs_zod_1.createZodDto)(permission_schema_1.UpdatePermissionBodySchema) {
}
exports.UpdatePermissionBodyDTO = UpdatePermissionBodyDTO;
class GetPermissionsResDTO extends (0, nestjs_zod_1.createZodDto)(permission_schema_1.GetPermissionsResSchema) {
}
exports.GetPermissionsResDTO = GetPermissionsResDTO;
class CreatePermissionResDTO extends (0, nestjs_zod_1.createZodDto)(permission_schema_1.CreatePermissionResSchema) {
}
exports.CreatePermissionResDTO = CreatePermissionResDTO;
class GetPermissionByIdResDTO extends (0, nestjs_zod_1.createZodDto)(permission_schema_1.GetPermissionByIdResSchema) {
}
exports.GetPermissionByIdResDTO = GetPermissionByIdResDTO;
class UpdatePermissionResDTO extends (0, nestjs_zod_1.createZodDto)(permission_schema_1.UpdatePermissionResSchema) {
}
exports.UpdatePermissionResDTO = UpdatePermissionResDTO;
//# sourceMappingURL=permission.dto.js.map