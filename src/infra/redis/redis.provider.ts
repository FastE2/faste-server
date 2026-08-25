import { Logger, Provider } from '@nestjs/common';
import Redis from 'ioredis';
import envConfig from 'src/common/configs/validate-env';
import { REDIS_CLIENT } from './redis.constants';

export const redisProviders: Provider[] = [
  {
    provide: REDIS_CLIENT,
    useFactory: () => {
      const logger = new Logger('RedisProvider');

      const isTls = envConfig.REDIS_URL.startsWith('rediss://');

      const redis = new Redis(envConfig.REDIS_URL, {
        ...(isTls && {
          tls: {
            rejectUnauthorized: false,
          },
        }),
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
        reconnectOnError: (err) => {
          const targetError = 'READONLY';
          if (err.message.includes(targetError)) {
            return true;
          }
          return false;
        },
      });

      redis.on('connect', () => {
        logger.log('Redis connected successfully');
      });

      redis.on('error', (err) => {
        logger.error(`Redis connection error: ${err.message}`);
      });

      return redis;
    },
  },
  {
    provide: Redis,
    useExisting: REDIS_CLIENT,
  },
];
