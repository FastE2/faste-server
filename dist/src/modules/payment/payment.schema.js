"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookPaymentBodySchema = exports.PaymentTransactionSchema = void 0;
const zod_1 = require("zod");
exports.PaymentTransactionSchema = zod_1.z.object({
    id: zod_1.z.number(),
    gateway: zod_1.z.string(),
    transactionDate: zod_1.z.date(),
    accountNumber: zod_1.z.string().nullable(),
    subAccount: zod_1.z.string().nullable(),
    amountIn: zod_1.z.number(),
    amountOut: zod_1.z.number(),
    accumulated: zod_1.z.number(),
    code: zod_1.z.string().nullable(),
    transactionContent: zod_1.z.string().nullable(),
    referenceNumber: zod_1.z.string().nullable(),
    body: zod_1.z.string().nullable(),
    createdAt: zod_1.z.date(),
});
exports.WebhookPaymentBodySchema = zod_1.z.object({
    id: zod_1.z.number(),
    gateway: zod_1.z.string(),
    transactionDate: zod_1.z.string(),
    accountNumber: zod_1.z.string().nullable(),
    code: zod_1.z.string().nullable(),
    content: zod_1.z.string().nullable(),
    transferType: zod_1.z.enum(['in', 'out']),
    transferAmount: zod_1.z.number(),
    accumulated: zod_1.z.number(),
    subAccount: zod_1.z.string().nullable(),
    referenceCode: zod_1.z.string().nullable(),
    description: zod_1.z.string(),
});
//# sourceMappingURL=payment.schema.js.map