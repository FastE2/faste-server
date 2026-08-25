import {
  Global,
  Module,
  Logger,
  OnApplicationShutdown,
  Inject,
} from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
import { redisProviders } from './redis.provider';

@Global()
@Module({
  providers: [...redisProviders],
  exports: [...redisProviders],
})
export class RedisModule implements OnApplicationShutdown {
  private readonly logger = new Logger(RedisModule.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async onApplicationShutdown(signal?: string) {
    this.logger.log(`Closing Redis connection due to signal: ${signal}`);
    try {
      await this.redis.quit();
      this.logger.log('Redis connection closed successfully.');
    } catch (err: any) {
      this.logger.error(`Error closing Redis connection: ${err.message}`);
      this.redis.disconnect();
    }
  }
}
