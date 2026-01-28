"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleResSchema = exports.GetRoleByIdResSchema = exports.CreateRoleResSchema = exports.GetRolesResSchema = exports.UpdateRoleBodySchema = exports.CreateRoleBodySchema = exports.GetRoleParamsSchema = exports.GetRolesQuerySchema = void 0;
const permission_schema_1 = require("../../common/schemas/permission.schema");
const request_schema_1 = require("../../common/schemas/request.schema");
const role_schema_1 = require("../../common/schemas/role.schema");
const zod_1 = require("zod");
exports.GetRolesQuerySchema = request_schema_1.PaginationQuerySchema;
exports.GetRoleParamsSchema = zod_1.z.object({
    id: zod_1.z.coerce.number(),
});
exports.CreateRoleBodySchema = role_schema_1.RoleSchema.pick({
    name: true,
    description: true,
    isActive: true,
});
exports.UpdateRoleBodySchema = role_schema_1.RoleSchema.pick({
    name: true,
    description: true,
    isActive: true,
})
    .extend({
    permissionIds: zod_1.z.array(zod_1.z.number()),
})
    .strict();
exports.GetRolesResSchema = zod_1.z.array(role_schema_1.RoleSchema);
exports.CreateRoleResSchema = role_schema_1.RoleSchema;
exports.GetRoleByIdResSchema = role_schema_1.RoleSchema;
exports.UpdateRoleResSchema = permission_schema_1.RolePermissionsSchema;
//# sourceMappingURL=role.schema.js.map