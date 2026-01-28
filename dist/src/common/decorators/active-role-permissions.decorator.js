"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveRolePermissions = void 0;
const common_1 = require("@nestjs/common");
const auth_constant_1 = require("../constants/auth.constant");
exports.ActiveRolePermissions = (0, common_1.createParamDecorator)((field, context) => {
    const request = context.switchToHttp().getRequest();
    const rolePermissions = request[auth_constant_1.REQUEST_ROLE_PERMISSIONS];
    return field ? rolePermissions?.[field] : rolePermissions;
});
//# sourceMappingURL=active-role-permissions.decorator.js.map