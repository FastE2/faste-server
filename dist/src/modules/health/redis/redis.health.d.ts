import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
export declare class RedisCloudHealthIndicator extends HealthIndicator {
    isHealthy(key?: string): Promise<HealthIndicatorResult>;
}
