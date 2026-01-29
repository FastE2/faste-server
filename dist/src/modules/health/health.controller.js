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
var HealthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const throttler_1 = require("@nestjs/throttler");
const redis_health_1 = require("./redis/redis.health");
const amqp_health_1 = require("./amqp/amqp.health");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
let HealthController = HealthController_1 = class HealthController {
    health;
    prisma;
    prismaService;
    redisHealth;
    amqpHealth;
    memory;
    logger = new common_1.Logger(HealthController_1.name);
    constructor(health, prisma, prismaService, redisHealth, amqpHealth, memory) {
        this.health = health;
        this.prisma = prisma;
        this.prismaService = prismaService;
        this.redisHealth = redisHealth;
        this.amqpHealth = amqpHealth;
        this.memory = memory;
    }
    check() {
        this.logger.log('================ HEALTH CHECK START ================');
        const result = this.health.check([
            () => this.logCheck('DATABASE', () => this.prisma.pingCheck('database', this.prismaService, {
                timeout: 3000,
            })),
            () => this.logCheck('REDIS', () => this.redisHealth.isHealthy('redis')),
            () => this.logCheck('RABBITMQ', () => this.amqpHealth.isHealthy()),
            () => this.logCheck('MEMORY', () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024)),
        ]);
        return result;
    }
    async logCheck(name, fn) {
        this.logger.log(`[${name}] checking...`);
        try {
            const result = await fn();
            this.logger.log(`[${name}] healthy`);
            return result;
        }
        catch (error) {
            this.logger.error(`[${name}] unhealthy`, error.stack);
            throw error;
        }
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)('/'),
    (0, throttler_1.SkipThrottle)(),
    (0, terminus_1.HealthCheck)(),
    (0, auth_decorator_1.Ispublic)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = HealthController_1 = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.PrismaHealthIndicator,
        prisma_service_1.PrismaService,
        redis_health_1.RedisCloudHealthIndicator,
        amqp_health_1.AmqpHealthIndicator,
        terminus_1.MemoryHealthIndicator])
], HealthController);
//# sourceMappingURL=health.controller.js.map