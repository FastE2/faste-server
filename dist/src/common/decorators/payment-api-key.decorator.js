"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentAPIKey = exports.PAYMENT_API_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PAYMENT_API_KEY = 'PAYMENT_API_KEY';
const PaymentAPIKey = () => (0, common_1.SetMetadata)(exports.PAYMENT_API_KEY, true);
exports.PaymentAPIKey = PaymentAPIKey;
//# sourceMappingURL=payment-api-key.decorator.js.map