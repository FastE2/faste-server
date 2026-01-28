"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProducer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const queue_constant_1 = require("../../common/constants/queue.constant");
const generate_1 = require("../../common/helpers/generate");
let OrderProducer = class OrderProducer {
    paymentQueue;
    constructor(paymentQueue) {
        this.paymentQueue = paymentQueue;
    }
    async scheduleCancelJob(transactionId) {
        await this.paymentQueue.add(queue_constant_1.CANCEL_PAYMENT_JOB_NAME, { transactionId }, {
            delay: 168 * 60 * 60 * 1000,
            jobId: (0, generate_1.generateCancelPaymentJobId)(transactionId),
            removeOnComplete: true,
            removeOnFail: true,
        });
    }
};
exports.OrderProducer = OrderProducer;
exports.OrderProducer = OrderProducer = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(queue_constant_1.PAYMENT_QUEUE_NAME)),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], OrderProducer);
//# sourceMappingURL=order.producer.js.map