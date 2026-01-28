"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserBodySchema = exports.CreateUserBodySchema = exports.GetUsersResSchema = exports.GetUserParamsSchema = exports.GetUsersInclueRoleSchema = exports.GetUserSchemaOmitPwTs = void 0;
const role_schema_1 = require("../../common/schemas/role.schema");
const user_schema_1 = require("../../common/schemas/user.schema");
const zod_1 = require("zod");
exports.GetUserSchemaOmitPwTs = user_schema_1.UserSchema.omit({
    password: true,
    totpSecret: true,
});
exports.GetUsersInclueRoleSchema = exports.GetUserSchemaOmitPwTs.extend({
    role: role_schema_1.RoleSchema.pick({
        id: true,
        name: true,
    })
        .strict()
        .strip(),
});
exports.GetUserParamsSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number().int().positive(),
})
    .strict();
exports.GetUsersResSchema = zod_1.z
    .object({
    data: zod_1.z.array(exports.GetUsersInclueRoleSchema),
    totalItem: zod_1.z.number(),
    page: zod_1.z.number(),
    limmit: zod_1.z.number(),
    totalPage: zod_1.z.number(),
})
    .strict();
exports.CreateUserBodySchema = user_schema_1.UserSchema.pick({
    email: true,
    name: true,
    phoneNumber: true,
    avatar: true,
    status: true,
    password: true,
    roleId: true,
}).strict();
exports.UpdateUserBodySchema = user_schema_1.UserSchema.pick({
    email: true,
    name: true,
    phoneNumber: true,
    avatar: true,
    status: true,
    password: true,
    roleId: true,
})
    .partial()
    .strict();
//# sourceMappingURL=user.schema.js.map