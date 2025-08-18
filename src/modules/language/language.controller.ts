import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { GetParamsDTO } from 'src/common/dtos/request.dto';
import { CreateLanguageBodyDTO, UpdateLanguageBodyDTO } from './language.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  findAllLanguages() {
    return this.languageService.findAll();
  }

  @Get('/:id')
  findOneLanguage(@Param() params: GetParamsDTO) {
    return this.languageService.findOne(params);
  }

  @Post()
  createLanguage(
    @Body() body: CreateLanguageBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.languageService.create(body, userId);
  }

  @Put('/:id')
  updateLanguage(
    @Param() params: GetParamsDTO,
    @Body() body: UpdateLanguageBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.languageService.update(params.id, body, userId);
  }

  @Delete('/:id')
  deleteLanguage(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.languageService.delete({ id: params.id, deletedById: userId });
  }
}
