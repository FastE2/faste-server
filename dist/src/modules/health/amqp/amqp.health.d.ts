import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
export declare class AmqpHealthIndicator extends HealthIndicator {
    isHealthy(key?: string): Promise<HealthIndicatorResult>;
}
