import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ReportRepository } from './report.repository';
import { ReportQueryType, TopItemsQueryType } from './report.schema';

const CACHE_TTL = 600; // 10 minutes

@Injectable()
export class AdminReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly redis: Redis,
  ) {}

  private cacheKey(endpoint: string, query: Record<string, unknown>): string {
    const hash = JSON.stringify(query);
    return `report:admin:${endpoint}:${hash}`;
  }

  private async cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached) as T;

    const data = await fetcher();
    await this.redis.set(key, JSON.stringify(data), 'EX', CACHE_TTL);
    return data;
  }

  async getOverview(query: ReportQueryType) {
    const key = this.cacheKey('overview', query as Record<string, unknown>);
    return this.cached(key, async () => {
      const range = this.reportRepository.resolveDateRange(query);
      const [overview, extras] = await Promise.all([
        this.reportRepository.getOverview(range),
        this.reportRepository.getAdminExtraCounts(range),
      ]);
      return { ...overview, ...extras };
    });
  }

  async getSalesTrend(query: ReportQueryType) {
    const key = this.cacheKey('trend', query as Record<string, unknown>);
    return this.cached(key, async () => {
      const range = this.reportRepository.resolveDateRange(query);
      const data = await this.reportRepository.getSalesTrend(range);
      return { data };
    });
  }

  async getTopProducts(query: TopItemsQueryType) {
    const key = this.cacheKey('top-products', query as Record<string, unknown>);
    return this.cached(key, async () => {
      const range = this.reportRepository.resolveDateRange(query);
      const data = await this.reportRepository.getTopProducts(
        range,
        query.limit,
      );
      return { data };
    });
  }

  async getTopSellers(query: TopItemsQueryType) {
    const key = this.cacheKey('top-sellers', query as Record<string, unknown>);
    return this.cached(key, async () => {
      const range = this.reportRepository.resolveDateRange(query);
      const data = await this.reportRepository.getTopSellers(
        range,
        query.limit,
      );
      return { data };
    });
  }
}
