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
exports.WsAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const token_service_1 = require("../libs/token/token.service");
const generate_1 = require("../helpers/generate");
let WsAuthGuard = class WsAuthGuard {
    tokenService;
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async canActivate(context) {
        const client = context.switchToWs().getClient();
        const token = client.handshake?.headers?.authorization;
        if (!token) {
            throw new websockets_1.WsException('Missing authorization header');
        }
        const accessToken = token.split(' ')[1];
        try {
            const { userId } = await this.tokenService.verifyAccessToken(accessToken);
            client.userId = userId;
            client.join((0, generate_1.generateRoomUserId)(userId));
            return true;
        }
        catch (err) {
            throw new websockets_1.WsException('Unauthorized');
        }
    }
};
exports.WsAuthGuard = WsAuthGuard;
exports.WsAuthGuard = WsAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], WsAuthGuard);
//# sourceMappingURL=ws-auth.guard.js.map