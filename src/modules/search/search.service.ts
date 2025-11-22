import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateProductSearchType } from './search.schema';
import {
  AggregationsAggregate,
  SearchRequest,
  SearchResponse,
} from '@elastic/elasticsearch/lib/api/types';

interface SearchProductsParams {
  keyword?: string;
  categoryIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  size?: number;
  from?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  orderBy?: 'popular' | 'new' | 'bestseller';
}

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search(params: SearchProductsParams) {
    const {
      keyword,
      categoryIds,
      minPrice,
      maxPrice,
      rating,
      size = 20,
      from = 0,
      sortBy = 'newest',
      order = 'asc',
      orderBy = 'new',
    } = params;

    const query: any = { bool: { must: [], filter: [] } };

    // --- Keyword search ---
    if (keyword) {
      query.bool.should = [
        { prefix: { name: { value: keyword.toLowerCase(), boost: 3 } } },
        { match_phrase_prefix: { name: { query: keyword, boost: 2 } } },
        {
          multi_match: {
            query: keyword,
            fields: ['name', 'description', 'skus.attributeValue'],
            type: 'best_fields',
            operator: 'and',
            fuzziness: 'AUTO',
          },
        },
      ];
      query.bool.minimum_should_match = 1;
    }

    // --- Category filter ---
    if (categoryIds?.length) {
      query.bool.filter.push({ terms: { categoryId: categoryIds } });
    }

    // --- Price filter (nested SKUs) ---
    if (minPrice != null || maxPrice != null) {
      query.bool.filter.push({
        nested: {
          path: 'skus',
          query: {
            range: {
              'skus.0.price': {
                gte: minPrice ?? 0,
                lte: maxPrice ?? Number.MAX_SAFE_INTEGER,
              },
            },
          },
        },
      });
    }

    // --- Rating filter ---
    if (rating != null) {
      query.bool.filter.push({
        range: { averageRating: { gte: rating } },
      });
    }

    // --- Build sort ---
    const sortMap: Record<string, any> = {
      newest: [{ createdAt: 'desc' }],
      price: [{ 'skus.0.price': order }],
      rating: [{ averageRating: 'desc' }],
      views_today: [{ viewsToday: 'desc' }],
      sales_today: [{ salesToday: 'desc' }],
    };

    let sort;
    switch (orderBy) {
      case 'new':
        sort = sortMap.newest;
        break;
      case 'popular':
        sort = sortMap.views_today;
        break;
      case 'bestseller':
        sort = sortMap.sales_today;
        break;
      default:
        sort = sortMap[sortBy] ?? sortMap.newest;
        break;
    }

    const body = {
      query,
      sort,
      size: Number(size),
      from,
    } as unknown as SearchRequest['body'];

    const res = await this.elasticsearchService.search({
      index: 'products',
      body: body,
    });

    return {
      items: res.hits.hits.map((h) => h._source),
      total: res.hits.total,
      page: Math.floor(from / size) + 1,
      limit: size,
    };
  }

  async indexDocument<T>(
    index: string,
    id: string,
    document: Omit<CreateProductSearchType, 'id'>,
  ) {
    return this.elasticsearchService.create<T>({
      index: index,
      id: id,
      body: document,
    });
  }

  async bulkIndexDocuments(
    index: string,
    documents: { id: string; data: Omit<CreateProductSearchType, 'id'> }[],
  ) {
    if (!documents.length) return { indexed: 0 };

    const body = documents.flatMap((doc) => [
      { index: { _index: index, _id: doc.id } },
      doc.data,
    ]);

    const res = await this.elasticsearchService.bulk({
      index,
      refresh: true,
      body,
    });

    return res;
  }
  async updateDocument(
    index: string,
    id: string,
    data: Partial<Omit<CreateProductSearchType, 'id'>>,
  ) {
    return this.elasticsearchService.update({
      index,
      id,
      doc: data,
      refresh: true,
    });
  }

  async deleteDocument(index: string, id: string) {
    return this.elasticsearchService.delete({
      index,
      id,
      refresh: true,
    });
  }

  // Score = (tần suất tìm kiếm) × (tỷ lệ click) × (tỷ lệ mua)
  async suggest(
    keyword: string,
  ): Promise<{ keyword: string; score: number; popularity: number }[]> {
    const fuzziness = keyword.length <= 3 ? 0 : keyword.length <= 5 ? 1 : 1;
    const res = await this.elasticsearchService.search({
      index: 'product_suggest',
      size: 0,
      suggest: {
        keyword_prefix: {
          prefix: keyword.toLowerCase(),
          completion: {
            field: 'suggest',
            size: 8,
            skip_duplicates: true,
          },
        },
        keyword_fuzzy: {
          text: keyword.toLowerCase(),
          completion: {
            field: 'suggest',
            fuzzy: {
              fuzziness: fuzziness,
            },
            size: 8,
            skip_duplicates: true,
          },
        },
      },
    });

    const prefixOptions = res.suggest?.keyword_prefix?.[0]?.options ?? [];
    const fuzzyOptions = res.suggest?.keyword_fuzzy?.[0]?.options ?? [];

    const finalOptions =
      (prefixOptions as any).length > 0 ? prefixOptions : fuzzyOptions;

    // Nếu không có dữ liệu → trả rỗng
    if (!Array.isArray(finalOptions)) return [];
    const result = finalOptions.map((opt) => ({
      keyword: opt.text ?? '',
      keyword_raw: opt._source.keyword_raw,
      score: opt._source?.score ?? opt._score ?? 0,
      popularity: opt._source?.popularity ?? 0,
    }));
    return result;
  }
}
