import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';
import { PrismaClient } from '@prisma/client';
import { RedisCloudHealthIndicator } from './redis/redis.health';
import { AmqpHealthIndicator } from './amqp/amqp.health';
import { ElasticsearchHealthIndicator } from './elasticsearch/elasticsearch.health';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private health: HealthCheckService,
    private prisma: PrismaHealthIndicator,
    private prismaClient: PrismaClient,
    private redisHealth: RedisCloudHealthIndicator,
    private elasticsearchHealth: ElasticsearchHealthIndicator,
    private amqpHealth: AmqpHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @SkipThrottle()
  @HealthCheck()
  check() {
    return this.health.check([
      // DATABASE
      () => this.prisma.pingCheck('database', this.prismaClient),

      // REDIS
      () => this.redisHealth.isHealthy('redis'),

      // ELASTICSEARCH
      () => this.elasticsearchHealth.isHealthy(),

      // AMQP (RabbitMQ)
      () => this.amqpHealth.isHealthy(),

      // MEMORY
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
    ]);
  }
}
