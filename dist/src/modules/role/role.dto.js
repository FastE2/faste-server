"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleResDTO = exports.GetRoleByIdResDTO = exports.CreateRoleResDTO = exports.GetRolesResDTO = exports.UpdateRoleBodyDTO = exports.GetRoleParamsDTO = exports.GetRolesQueryDTO = exports.CreateRoleBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const role_schema_1 = require("./role.schema");
class CreateRoleBodyDTO extends (0, nestjs_zod_1.createZodDto)(role_schema_1.CreateRoleBodySchema) {
}
exports.CreateRoleBodyDTO = CreateRoleBodyDTO;
class GetRolesQueryDTO extends (0, nestjs_zod_1.createZodDto)(role_schema_1.GetRolesQuerySchema) {
}
exports.GetRolesQueryDTO = GetRolesQueryDTO;
class GetRoleParamsDTO extends (0, nestjs_zod_1.createZodDto)(role_schema_1.GetRoleParamsSchema) {
}
exports.GetRoleParamsDTO = GetRoleParamsDTO;
class UpdateRoleBodyDTO extends (0, nestjs_zod_1.createZodDto)(role_schema_1.UpdateRoleBodySchema) {
}
exports.UpdateRoleBodyDTO = UpdateRoleBodyDTO;
class GetRolesResDTO extends (0, nestjs_zod_1.createZodDto)(role_schema_1.GetRolesResSchema) {
}
exports.GetRolesResDTO = GetRolesResDTO;
class CreateRoleResDTO extends (0, nestjs_zod_1.createZodDto)(role_schema_1.CreateRoleResSchema) {
}
exports.CreateRoleResDTO = CreateRoleResDTO;
class GetRoleByIdResDTO extends (0, nestjs_zod_1.createZodDto)(role_schema_1.GetRoleByIdResSchema) {
}
exports.GetRoleByIdResDTO = GetRoleByIdResDTO;
class UpdateRoleResDTO extends (0, nestjs_zod_1.createZodDto)(role_schema_1.UpdateRoleResSchema) {
}
exports.UpdateRoleResDTO = UpdateRoleResDTO;
//# sourceMappingURL=role.dto.js.map