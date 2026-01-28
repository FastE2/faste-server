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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const validate_env_1 = __importDefault(require("../configs/validate-env"));
let ApiKeyGuard = class ApiKeyGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requirePaymentApiKey = this.reflector.get('PAYMENT_API_KEY', context.getHandler());
        if (!requirePaymentApiKey) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const apiKey = Array.isArray(request.headers['x-api-key'])
            ? request.headers['x-api-key'][0]
            : request.headers['x-api-key'];
        if (!apiKey) {
            throw new common_1.UnauthorizedException('Missing x-api-key header');
        }
        if (apiKey !== validate_env_1.default.PAYMENT_API_KEY) {
            throw new common_1.UnauthorizedException('Invalid API key');
        }
        return true;
    }
};
exports.ApiKeyGuard = ApiKeyGuard;
exports.ApiKeyGuard = ApiKeyGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ApiKeyGuard);
//# sourceMappingURL=api-key.guard.js.map