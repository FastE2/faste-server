import { Controller, Get, Param } from '@nestjs/common';
import { FlashsaleClientService } from './flashsale-client.service';

@Controller('flashsales')
export class FlashsaleClientController {
  constructor(private readonly clientService: FlashsaleClientService) {}

  @Get('')
  getActive() {
    return this.clientService.findActive();
  }

  @Get('upcoming')
  getUpcoming() {
    return this.clientService.findUpcoming();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.clientService.findOne(+id);
  }

  @Get(':id/items')
  getItems(@Param('id') id: number) {
    return this.clientService.findItems(+id);
  }
}
