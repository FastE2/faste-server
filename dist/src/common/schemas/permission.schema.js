"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionsSchema = exports.PermissionSchema = void 0;
const zod_1 = require("zod");
const role_schema_1 = require("./role.schema");
const client_1 = require("@prisma/client");
exports.PermissionSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    path: zod_1.z.string(),
    method: zod_1.z.nativeEnum(client_1.HTTPMethod),
    module: zod_1.z.string(),
    isActive: zod_1.z.boolean(),
    createdById: zod_1.z.number().nullable(),
    updatedById: zod_1.z.number().nullable(),
    deletedById: zod_1.z.number().nullable(),
    deletedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.RolePermissionsSchema = role_schema_1.RoleSchema.extend({
    permissions: zod_1.z.array(exports.PermissionSchema),
});
//# sourceMappingURL=permission.schema.js.map