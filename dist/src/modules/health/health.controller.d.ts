import { HealthCheckService, MemoryHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import { RedisCloudHealthIndicator } from './redis/redis.health';
import { AmqpHealthIndicator } from './amqp/amqp.health';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class HealthController {
    private health;
    private prisma;
    private prismaService;
    private redisHealth;
    private amqpHealth;
    private memory;
    private readonly logger;
    constructor(health: HealthCheckService, prisma: PrismaHealthIndicator, prismaService: PrismaService, redisHealth: RedisCloudHealthIndicator, amqpHealth: AmqpHealthIndicator, memory: MemoryHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    private logCheck;
}
