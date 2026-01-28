"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartItemBodyDTO = exports.AddToCartBodyDTO = exports.CartItemResDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const cart_schema_1 = require("./cart.schema");
class CartItemResDTO extends (0, nestjs_zod_1.createZodDto)(cart_schema_1.CartItemSchema) {
}
exports.CartItemResDTO = CartItemResDTO;
class AddToCartBodyDTO extends (0, nestjs_zod_1.createZodDto)(cart_schema_1.AddToCartBodySchema) {
}
exports.AddToCartBodyDTO = AddToCartBodyDTO;
class UpdateCartItemBodyDTO extends (0, nestjs_zod_1.createZodDto)(cart_schema_1.UpdateCartItemBodySchema) {
}
exports.UpdateCartItemBodyDTO = UpdateCartItemBodyDTO;
//# sourceMappingURL=cart.dto.js.map