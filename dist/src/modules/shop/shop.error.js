"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistedShopException = exports.ForbiddenActionOnBaseRoleException = void 0;
const common_1 = require("@nestjs/common");
exports.ForbiddenActionOnBaseRoleException = new common_1.ForbiddenException('Error.ForbiddenActionOnBaseRole');
exports.ExistedShopException = new common_1.BadRequestException({
    message: 'Error.ExistedShop',
});
//# sourceMappingURL=shop.error.js.map