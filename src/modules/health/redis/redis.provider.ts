// redis.provider.ts
import Redis from 'ioredis';

export const redis = new Redis(process.env.REDIS_URL!, {
  connectTimeout: 500,
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false,
});
