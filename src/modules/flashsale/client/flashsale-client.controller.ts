import { Controller, Get, Param, Query } from '@nestjs/common';
import { FlashsaleClientService } from './flashsale-client.service';
import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { Ispublic } from 'src/common/decorators/auth.decorator';

@Controller('flashsales')
export class FlashsaleClientController {
  constructor(
    private readonly flashSaleClientService: FlashsaleClientService,
  ) {}

  @Get('')
  @Ispublic()
  getActive(@Query() query: PaginationQueryDTO) {
    return this.flashSaleClientService.findActive(query);
  }

  @Get('upcoming')
  getUpcoming(@Query() query: PaginationQueryDTO) {
    return this.flashSaleClientService.findUpcoming(query);
  }

  @Get(':id')
  @Ispublic()
  getOne(@Param() params: GetParamsDTO) {
    return this.flashSaleClientService.findOne(params.id);
  }

  @Get(':id/items')
  @Ispublic()
  getItems(@Param() params: GetParamsDTO, @Query() query: PaginationQueryDTO) {
    return this.flashSaleClientService.findItems({ query, id: params.id });
  }
}
