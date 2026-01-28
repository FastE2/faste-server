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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const payment_repository_1 = require("./payment.repository");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const generate_1 = require("../../common/helpers/generate");
const socket_constant_1 = require("../../common/constants/socket.constant");
let PaymentService = class PaymentService {
    paymentRepository;
    server;
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async receiver(body) {
        const userId = await this.paymentRepository.receiver(body);
        this.server.to((0, generate_1.generateRoomUserId)(userId)).emit(socket_constant_1.WS_EVENT.PAYMENT.PAYMENT, {
            status: 'success',
        });
        return {
            message: 'Payment received successfully',
        };
    }
};
exports.PaymentService = PaymentService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PaymentService.prototype, "server", void 0);
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({ namespace: socket_constant_1.WS_NAMESPACE.PAYMENT }),
    __metadata("design:paramtypes", [payment_repository_1.PaymentRepository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map