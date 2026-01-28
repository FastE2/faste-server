"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCloudHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const redis_provider_1 = require("./redis.provider");
let RedisCloudHealthIndicator = class RedisCloudHealthIndicator extends terminus_1.HealthIndicator {
    async isHealthy(key = 'redis') {
        try {
            const res = await redis_provider_1.redis.ping();
            if (res !== 'PONG') {
                throw new Error('No PONG');
            }
            return this.getStatus(key, true);
        }
        catch (e) {
            throw new terminus_1.HealthCheckError('Redis Cloud failed', this.getStatus(key, false));
        }
    }
};
exports.RedisCloudHealthIndicator = RedisCloudHealthIndicator;
exports.RedisCloudHealthIndicator = RedisCloudHealthIndicator = __decorate([
    (0, common_1.Injectable)()
], RedisCloudHealthIndicator);
//# sourceMappingURL=redis.health.js.map