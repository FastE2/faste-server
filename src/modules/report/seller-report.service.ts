import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ReportRepository } from './report.repository';
import { ReportQueryType, TopItemsQueryType } from './report.schema';

const CACHE_TTL = 600; // 10 minutes

@Injectable()
export class SellerReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly redis: Redis,
  ) {}

  private cacheKey(
    sellerId: number,
    endpoint: string,
    query: Record<string, unknown>,
  ): string {
    const hash = JSON.stringify(query);
    return `report:seller:${sellerId}:${endpoint}:${hash}`;
  }

  private async cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached) as T;

    const data = await fetcher();
    await this.redis.set(key, JSON.stringify(data), 'EX', CACHE_TTL);
    return data;
  }

  async getOverview(shopId: number, query: ReportQueryType) {
    const key = this.cacheKey(
      shopId,
      'overview',
      query as Record<string, unknown>,
    );
    return this.cached(key, async () => {
      const range = this.reportRepository.resolveDateRange(query);
      return this.reportRepository.getOverview(range, shopId);
    });
  }

  async getSalesTrend(shopId: number, query: ReportQueryType) {
    const key = this.cacheKey(
      shopId,
      'trend',
      query as Record<string, unknown>,
    );
    return this.cached(key, async () => {
      const range = this.reportRepository.resolveDateRange(query);
      const data = await this.reportRepository.getSalesTrend(range, shopId);
      return { data };
    });
  }

  async getTopProducts(shopId: number, query: TopItemsQueryType) {
    const key = this.cacheKey(
      shopId,
      'top-products',
      query as Record<string, unknown>,
    );
    return this.cached(key, async () => {
      const range = this.reportRepository.resolveDateRange(query);
      const data = await this.reportRepository.getTopProducts(
        range,
        query.limit,
        shopId,
      );
      return { data };
    });
  }
}
