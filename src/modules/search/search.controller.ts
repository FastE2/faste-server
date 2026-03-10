import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService } from './search.service';
import { Ispublic } from 'src/common/decorators/auth.decorator';
import { CreateProductSearchDTO } from './dtos/create.dto';
import { SearchProductService } from './search-product.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly searchProductService: SearchProductService,
  ) {}

  /**
   * POST /search
   * Tìm kiếm sản phẩm
   */
  @Get()
  @Ispublic()
  searchProducts(
    @Query('keyword') keyword?: string,
    @Query('categoryIds') categoryIdsStr?: string,
    @Query('minPrice') minPriceStr?: string,
    @Query('maxPrice') maxPriceStr?: string,
    @Query('rating') ratingStr?: string,
    @Query('sortBy') sortBy = 'newest',
    @Query('page') pageStr?: string,
    @Query('limit') limitStr?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('orderBy') orderBy: 'popular' | 'new' | 'bestseller' = 'new',
  ) {
    const page = Number(pageStr) || 1;
    const limit = Number(limitStr) || 20;
    const minPrice = minPriceStr ? Number(minPriceStr) : undefined;
    const maxPrice = maxPriceStr ? Number(maxPriceStr) : undefined;
    const categoryIds = categoryIdsStr
      ? categoryIdsStr.split(',').map((id) => Number(id))
      : undefined;
    const rating = ratingStr ? Number(ratingStr) : undefined;

    if (rating != null && (rating < 0 || rating > 5)) {
      throw new BadRequestException(
        'Rating must be greater than 0 and less than 5',
      );
    }
    return this.searchProductService.search({
      keyword,
      categoryIds,
      minPrice,
      maxPrice,
      rating,
      page,
      limit,
      sortBy,
      order,
      orderBy,
    });
  }

  @Get('suggest')
  @Ispublic()
  async suggest(@Query('keyword') keyword: string): Promise<any[]> {
    if (!keyword) return [];
    return await this.searchProductService.suggest(keyword);
  }

  @EventPattern('product.created')
  async indexProduct(@Payload() payload: CreateProductSearchDTO) {
    const { id, ...rest } = payload;
    return this.searchService.indexDocument('products', String(id), rest);
  }

  @MessagePattern('product.updated')
  async update(@Payload() payload: any) {
    const { id, ...rest } = payload;
    return this.searchService.updateDocument('products', String(id), rest);
  }

  @MessagePattern('product.deleted')
  async delete(@Payload() payload: any) {
    const { id } = payload;
    return this.searchService.deleteDocument('products', String(id));
  }
}
