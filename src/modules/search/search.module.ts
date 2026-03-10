import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ClientsModule, Transport } from '@nestjs/microservices';
import envConfig from 'src/common/configs/validate-env';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchProductService } from './search-product.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SEARCH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [envConfig.AMQP_URL],
          queue: 'search_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: envConfig.ELASTICSEARCH_NODE || 'http://localhost:9200',
        auth: {
          apiKey: envConfig.ELASTICSEARCH_APIKEY,
        },
      }),
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService, SearchProductService],
})
export class SearchModule {}
