"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFlashSaleItemBodyDTO = exports.CreateFlashSaleItemBodyDTO = exports.CreateFlashSaleBodyDTO = exports.FlashSaleListSellerQueryDTO = exports.GetParamsFlashSaleDTO = exports.FlashSaleListQueryDTO = exports.UpdateFlashSaleStatusBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const flashsale_schema_1 = require("./flashsale.schema");
const flashsale_item_schema_1 = require("./flashsale-item.schema");
class UpdateFlashSaleStatusBodyDTO extends (0, nestjs_zod_1.createZodDto)(flashsale_schema_1.UpdateFlashSaleStatusBodySchema) {
}
exports.UpdateFlashSaleStatusBodyDTO = UpdateFlashSaleStatusBodyDTO;
class FlashSaleListQueryDTO extends (0, nestjs_zod_1.createZodDto)(flashsale_schema_1.FlashSaleListQuerySchema) {
}
exports.FlashSaleListQueryDTO = FlashSaleListQueryDTO;
class GetParamsFlashSaleDTO extends (0, nestjs_zod_1.createZodDto)(flashsale_item_schema_1.GetParamsFlashSaleSchema) {
}
exports.GetParamsFlashSaleDTO = GetParamsFlashSaleDTO;
class FlashSaleListSellerQueryDTO extends (0, nestjs_zod_1.createZodDto)(flashsale_schema_1.FlashSaleListQuerySchema.omit({
    createdById: true,
    type: true,
})) {
}
exports.FlashSaleListSellerQueryDTO = FlashSaleListSellerQueryDTO;
class CreateFlashSaleBodyDTO extends (0, nestjs_zod_1.createZodDto)(flashsale_schema_1.CreateFlashSaleBodySchema.omit({ type: true })) {
}
exports.CreateFlashSaleBodyDTO = CreateFlashSaleBodyDTO;
class CreateFlashSaleItemBodyDTO extends (0, nestjs_zod_1.createZodDto)(flashsale_item_schema_1.CreateFlashSaleItemBodySchema.array()) {
}
exports.CreateFlashSaleItemBodyDTO = CreateFlashSaleItemBodyDTO;
class UpdateFlashSaleItemBodyDTO extends (0, nestjs_zod_1.createZodDto)(flashsale_item_schema_1.UpdateFlashSaleItemBodySchema) {
}
exports.UpdateFlashSaleItemBodyDTO = UpdateFlashSaleItemBodyDTO;
//# sourceMappingURL=flashsale.dto.js.map