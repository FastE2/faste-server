"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderStatusBodyDTO = exports.CreateOrderBodyDTO = exports.GetOrderListQueryDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const order_schema_1 = require("./order.schema");
class GetOrderListQueryDTO extends (0, nestjs_zod_1.createZodDto)(order_schema_1.GetOrderListQuerySchema) {
}
exports.GetOrderListQueryDTO = GetOrderListQueryDTO;
class CreateOrderBodyDTO extends (0, nestjs_zod_1.createZodDto)(order_schema_1.CreateOrderBodySchema) {
}
exports.CreateOrderBodyDTO = CreateOrderBodyDTO;
class UpdateOrderStatusBodyDTO extends (0, nestjs_zod_1.createZodDto)(order_schema_1.UpdateOrderStatusBodySchema) {
}
exports.UpdateOrderStatusBodyDTO = UpdateOrderStatusBodyDTO;
//# sourceMappingURL=order.dto.js.map