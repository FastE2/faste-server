import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchHealthIndicator extends HealthIndicator {
  constructor(private readonly es: ElasticsearchService) {
    super();
  }

  async isHealthy(key = 'elasticsearch'): Promise<HealthIndicatorResult> {
    try {
      await this.es.ping();
      return this.getStatus(key, true);
    } catch (error) {
      throw new HealthCheckError(
        'Elasticsearch check failed',
        this.getStatus(key, false),
      );
    }
  }
}
