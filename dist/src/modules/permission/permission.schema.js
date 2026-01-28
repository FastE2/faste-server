"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePermissionResSchema = exports.GetPermissionByIdResSchema = exports.CreatePermissionResSchema = exports.GetPermissionsResSchema = exports.UpdatePermissionBodySchema = exports.CreatePermissionBodySchema = exports.GetPermissionParamsSchema = void 0;
const permission_schema_1 = require("../../common/schemas/permission.schema");
const zod_1 = require("zod");
exports.GetPermissionParamsSchema = zod_1.z.object({
    id: zod_1.z.coerce.number(),
});
exports.CreatePermissionBodySchema = permission_schema_1.PermissionSchema.pick({
    name: true,
    path: true,
    method: true,
    module: true,
}).strict();
exports.UpdatePermissionBodySchema = exports.CreatePermissionBodySchema;
exports.GetPermissionsResSchema = zod_1.z.array(permission_schema_1.PermissionSchema);
exports.CreatePermissionResSchema = permission_schema_1.PermissionSchema;
exports.GetPermissionByIdResSchema = permission_schema_1.PermissionSchema;
exports.UpdatePermissionResSchema = permission_schema_1.PermissionSchema.extend({
    roles: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.number(),
        name: zod_1.z.string(),
        description: zod_1.z.string().nullable(),
    })),
});
//# sourceMappingURL=permission.schema.js.map