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
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private health: HealthCheckService,
    private prisma: PrismaHealthIndicator,
    private prismaService: PrismaService,
    private redisHealth: RedisCloudHealthIndicator,
    // private elasticsearchHealth: ElasticsearchHealthIndicator,
    private amqpHealth: AmqpHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get('/')
  @SkipThrottle()
  @HealthCheck()
  check() {
    this.logger.log('================ HEALTH CHECK START ================');

    const result = this.health.check([
      // () =>
      //   this.logCheck('DATABASE', () =>
      //     this.prisma.pingCheck('database', this.prismaService, {
      //       timeout: 3000,
      //     }),
      //   ),

      () => this.logCheck('REDIS', () => this.redisHealth.isHealthy('redis')),

      // ELASTICSEARCH
      // () => this.elasticsearchHealth.isHealthy(),

      () => this.logCheck('RABBITMQ', () => this.amqpHealth.isHealthy()),

      () =>
        this.logCheck('MEMORY', () =>
          this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
        ),
    ]);

    return result;
  }

  /**
   * Group logger for health checks
   */
  private async logCheck(name: string, fn: () => Promise<any>) {
    this.logger.log(`[${name}] checking...`);

    try {
      const result = await fn();
      this.logger.log(`[${name}] healthy`);
      return result;
    } catch (error) {
      this.logger.error(`[${name}] unhealthy`, error);
      throw error;
    }
  }
}
