import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { ElasticsearchService } from '@nestjs/elasticsearch';
export declare class ElasticsearchHealthIndicator extends HealthIndicator {
    private readonly es;
    constructor(es: ElasticsearchService);
    isHealthy(key?: string): Promise<HealthIndicatorResult>;
}
