import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { RedisCloudHealthIndicator } from './redis/redis.health';
import { ElasticsearchHealthIndicator } from './elasticsearch/elasticsearch.health';
import { PrismaClient } from '@prisma/client';
import { AmqpHealthIndicator } from './amqp/amqp.health';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    TerminusModule,
    NestElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE,
    }),
  ],
  controllers: [HealthController],
  providers: [
    PrismaClient,
    RedisCloudHealthIndicator,
    ElasticsearchHealthIndicator,
    AmqpHealthIndicator,
  ],
})
export class HealthModule {}
