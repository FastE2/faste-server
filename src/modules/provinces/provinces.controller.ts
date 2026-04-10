import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetParamsProvincesDTO, QueryProvincesDTO } from './provinces.dto';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  // Provinces (state)
  @Get(':countryCode/s')
  getStates(
    @Param('countryCode') countryCode: string,
    @Query() query: QueryProvincesDTO,
  ) {
    return this.provincesService.getStates(countryCode, query);
  }

  @Get(':countryCode/s/:id')
  getStateById(@Param() params: GetParamsProvincesDTO) {
    return this.provincesService.getStateById(params.countryCode, params.id);
  }

  // Cities
  @Get(':countryCode/c')
  getCities(
    @Param('countryCode') countryCode: string,
    @Query() query: QueryProvincesDTO,
  ) {
    return this.provincesService.getCities(countryCode, query);
  }

  @Get(':countryCode/c/:id')
  getCityById(@Param() params: GetParamsProvincesDTO) {
    return this.provincesService.getCityById(params.countryCode, params.id);
  }

  // Districts
  @Get(':countryCode/d')
  getDistricts(
    @Param('countryCode') countryCode: string,
    @Query() query: QueryProvincesDTO,
  ) {
    return this.provincesService.getDistricts(countryCode, query);
  }

  @Get(':countryCode/d/:id')
  getDistrictById(@Param() params: GetParamsProvincesDTO) {
    return this.provincesService.getDistrictById(params.countryCode, params.id);
  }

  // Wards
  @Get(':countryCode/w')
  getWards(
    @Param('countryCode') countryCode: string,
    @Query() query: QueryProvincesDTO,
  ) {
    return this.provincesService.getWards(countryCode, query);
  }

  @Get(':countryCode/w/:id')
  getWardById(@Param() params: GetParamsProvincesDTO) {
    return this.provincesService.getWardById(params.countryCode, params.id);
  }

  @Get('/:countryCode')
  getCountryById(@Param('countryCode') countryCode: string) {
    return this.provincesService.getCountryById(countryCode);
  }
}
