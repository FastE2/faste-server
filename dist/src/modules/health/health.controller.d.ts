import { HealthCheckService, MemoryHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';
import { RedisCloudHealthIndicator } from './redis/redis.health';
import { AmqpHealthIndicator } from './amqp/amqp.health';
import { ElasticsearchHealthIndicator } from './elasticsearch/elasticsearch.health';
export declare class HealthController {
    private health;
    private prisma;
    private prismaClient;
    private redisHealth;
    private elasticsearchHealth;
    private amqpHealth;
    private memory;
    private readonly logger;
    constructor(health: HealthCheckService, prisma: PrismaHealthIndicator, prismaClient: PrismaClient, redisHealth: RedisCloudHealthIndicator, elasticsearchHealth: ElasticsearchHealthIndicator, amqpHealth: AmqpHealthIndicator, memory: MemoryHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
