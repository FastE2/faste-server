"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotCancelOrderException = exports.ProductNotBelongToShopException = exports.OutOfStockSKUException = exports.NotFoundCartItemException = exports.ForbiddenActionOnBaseRoleException = void 0;
const common_1 = require("@nestjs/common");
exports.ForbiddenActionOnBaseRoleException = new common_1.ForbiddenException('Error.ForbiddenActionOnBaseRole');
exports.NotFoundCartItemException = new common_1.NotFoundException('Error.NotFoundCartItemException');
const OutOfStockSKUException = (sku) => new common_1.BadRequestException(`Error.OutOfStockSKUException: ${sku}`);
exports.OutOfStockSKUException = OutOfStockSKUException;
const ProductNotBelongToShopException = () => new common_1.ForbiddenException(`Error.ProductNotBelongToShopException`);
exports.ProductNotBelongToShopException = ProductNotBelongToShopException;
const CannotCancelOrderException = () => new common_1.BadRequestException(`Error.CannotCancelOrderException`);
exports.CannotCancelOrderException = CannotCancelOrderException;
//# sourceMappingURL=order.error.js.map