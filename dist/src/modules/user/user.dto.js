"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserResDTO = exports.CreateUserBodyDTO = exports.UpdateUserResDTO = exports.UpdateUserBodyDTO = exports.GetUserByIdResDTO = exports.GetUserParamsDTO = exports.GetUsersResDTO = exports.GetUsersQueryDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const request_schema_1 = require("../../common/schemas/request.schema");
const user_schema_1 = require("./user.schema");
class GetUsersQueryDTO extends (0, nestjs_zod_1.createZodDto)(request_schema_1.PaginationQuerySchema) {
}
exports.GetUsersQueryDTO = GetUsersQueryDTO;
class GetUsersResDTO extends (0, nestjs_zod_1.createZodDto)(user_schema_1.GetUsersResSchema) {
}
exports.GetUsersResDTO = GetUsersResDTO;
class GetUserParamsDTO extends (0, nestjs_zod_1.createZodDto)(user_schema_1.GetUserParamsSchema) {
}
exports.GetUserParamsDTO = GetUserParamsDTO;
class GetUserByIdResDTO extends (0, nestjs_zod_1.createZodDto)(user_schema_1.GetUsersInclueRoleSchema) {
}
exports.GetUserByIdResDTO = GetUserByIdResDTO;
class UpdateUserBodyDTO extends (0, nestjs_zod_1.createZodDto)(user_schema_1.UpdateUserBodySchema) {
}
exports.UpdateUserBodyDTO = UpdateUserBodyDTO;
class UpdateUserResDTO extends (0, nestjs_zod_1.createZodDto)(user_schema_1.GetUserSchemaOmitPwTs) {
}
exports.UpdateUserResDTO = UpdateUserResDTO;
class CreateUserBodyDTO extends (0, nestjs_zod_1.createZodDto)(user_schema_1.CreateUserBodySchema) {
}
exports.CreateUserBodyDTO = CreateUserBodyDTO;
class CreateUserResDTO extends (0, nestjs_zod_1.createZodDto)(user_schema_1.GetUserSchemaOmitPwTs) {
}
exports.CreateUserResDTO = CreateUserResDTO;
//# sourceMappingURL=user.dto.js.map