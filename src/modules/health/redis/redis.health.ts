import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { redis } from './redis.provider';

@Injectable()
export class RedisCloudHealthIndicator extends HealthIndicator {
  async isHealthy(key = 'redis'): Promise<HealthIndicatorResult> {
    try {
      const res = await redis.ping();
      if (res !== 'PONG') {
        throw new Error('No PONG');
      }

      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError(
        'Redis Cloud failed',
        this.getStatus(key, false),
      );
    }
  }
}
