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
exports.PaymentGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const socket_constant_1 = require("../constants/socket.constant");
let PaymentGateway = class PaymentGateway {
    server;
    afterInit(server) {
        console.log('WebSocket server initialized');
    }
    handleConnection(client, ...args) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleEvent(data) {
        this.server.emit(socket_constant_1.WS_EVENT.PAYMENT.RECEIVE, {
            data: `Money: ${data}`,
        });
        return data;
    }
};
exports.PaymentGateway = PaymentGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PaymentGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('send-money'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], PaymentGateway.prototype, "handleEvent", null);
exports.PaymentGateway = PaymentGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: socket_constant_1.WS_NAMESPACE.PAYMENT })
], PaymentGateway);
//# sourceMappingURL=payment.gateway.js.map