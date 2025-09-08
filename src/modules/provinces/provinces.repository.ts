import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { DIVISION_LEVEL } from 'src/common/constants/division-level.constant';

@Injectable()
export class ProvincesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private async paginate<T>(
    model: any,
    where: object,
    pagination: PaginationQueryType,
  ) {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;

    const [data, totalItem] = await Promise.all([
      model.findMany({ where, skip, take }),
      model.count({ where }),
    ]);

    return {
      data,
      totalItem,
      page: pagination.page,
      limit: pagination.limit,
      totalPage: Math.ceil(totalItem / pagination.limit),
    };
  }

  async findUniqueCountry(countryCode: string) {
    return await this.prismaService.country.findUniqueOrThrow({
      where: {
        iso2: countryCode.toUpperCase(),
      },
    });
  }

  async listDivisions(
    countryCode: string,
    level: DIVISION_LEVEL,
    pagination: PaginationQueryType,
  ) {
    const country = await this.findUniqueCountry(countryCode);
    return this.paginate(
      this.prismaService.administrativeDivision,
      { countryId: country.id, level },
      pagination,
    );
  }

  async findDivisionById(
    countryCode: string,
    id: number,
    level: DIVISION_LEVEL,
  ) {
    return this.prismaService.administrativeDivision.findFirst({
      where: {
        id,
        level,
        country: {
          iso2: countryCode.toUpperCase(),
        },
      },
    });
  }

  async listStates(countryCode: string, pagination: PaginationQueryType) {
    const country = await this.findUniqueCountry(countryCode);
    return this.paginate(
      this.prismaService.administrativeDivision,
      { countryId: country.id, level: DIVISION_LEVEL.STATE },
      pagination,
    );
  }

  async listDistricts(countryCode: string, pagination: PaginationQueryType) {
    const country = await this.findUniqueCountry(countryCode);
    return this.paginate(
      this.prismaService.administrativeDivision,
      { countryId: country.id, level: DIVISION_LEVEL.DISTRICT },
      pagination,
    );
  }

  async listCities(countryCode: string, pagination: PaginationQueryType) {
    const country = await this.findUniqueCountry(countryCode);
    return this.paginate(
      this.prismaService.administrativeDivision,
      { countryId: country.id, level: DIVISION_LEVEL.CITY },
      pagination,
    );
  }

  async listWards(countryCode: string, pagination: PaginationQueryType) {
    const country = await this.findUniqueCountry(countryCode);
    return this.paginate(
      this.prismaService.administrativeDivision,
      { countryId: country.id, level: DIVISION_LEVEL.WARD },
      pagination,
    );
  }

  async findStateById(countryCode: string, id: number) {
    return this.prismaService.administrativeDivision.findFirst({
      where: {
        id,
        level: DIVISION_LEVEL.STATE,
        country: { iso2: countryCode },
      },
    });
  }

  async findDistrictById(countryCode: string, id: number) {
    return this.prismaService.administrativeDivision.findFirst({
      where: {
        id,
        level: DIVISION_LEVEL.DISTRICT,
        country: { iso2: countryCode },
      },
    });
  }

  async findCityById(countryCode: string, id: number) {
    return this.prismaService.administrativeDivision.findFirst({
      where: {
        id,
        level: DIVISION_LEVEL.CITY,
        country: { iso2: countryCode },
      },
    });
  }

  async findWardById(countryCode: string, id: number) {
    return this.prismaService.administrativeDivision.findFirst({
      where: {
        id,
        level: DIVISION_LEVEL.WARD,
        country: { iso2: countryCode },
      },
    });
  }
}
