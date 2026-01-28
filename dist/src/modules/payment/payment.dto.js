"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookPaymentBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const payment_schema_1 = require("./payment.schema");
class WebhookPaymentBodyDTO extends (0, nestjs_zod_1.createZodDto)(payment_schema_1.WebhookPaymentBodySchema) {
}
exports.WebhookPaymentBodyDTO = WebhookPaymentBodyDTO;
//# sourceMappingURL=payment.dto.js.map