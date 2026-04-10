import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { ProvincesRepository } from './provinces.repository';
import { DIVISION_LEVEL } from '../../common/constants/division-level.constant';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';
import { QueryProvincesType } from './provinces.schema';

@Injectable()
export class ProvincesService {
  constructor(private readonly provincesRepository: ProvincesRepository) {}

  getCountryById(countryCode: string) {
    try {
      // countryCode = countryCode.toUpperCase();
      return this.provincesRepository.findUniqueCountry(countryCode);
    } catch (error) {
      console.log('/provinces/:countryCode', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async getStates(countryCode: string, query: QueryProvincesType) {
    try {
      return await this.provincesRepository.listDivisions(
        countryCode,
        DIVISION_LEVEL.STATE,
        query,
      );
    } catch (error) {
      console.log('/provinces/s', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async getDistricts(countryCode: string, query: QueryProvincesType) {
    try {
      return await this.provincesRepository.listDivisions(
        countryCode,
        DIVISION_LEVEL.DISTRICT,
        query,
      );
    } catch (error) {
      console.log('/provinces/d', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async getCities(countryCode: string, query: QueryProvincesType) {
    try {
      return await this.provincesRepository.listDivisions(
        countryCode,
        DIVISION_LEVEL.CITY,
        query,
      );
    } catch (error) {
      console.log('/provinces/d', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async getWards(countryCode: string, query: QueryProvincesType) {
    try {
      return await this.provincesRepository.listDivisions(
        countryCode,
        DIVISION_LEVEL.WARD,
        query,
      );
    } catch (error) {
      console.log('/provinces/w', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async getStateById(countryCode: string, id: number) {
    try {
      await this.provincesRepository.findUniqueCountry(countryCode);
      const state = await this.provincesRepository.findDivisionById(
        countryCode,
        id,
        DIVISION_LEVEL.STATE,
      );
      if (!state) {
        throw NotFoundRecordException;
      }
      return state;
    } catch (error) {
      console.log('/provinces/s/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async getDistrictById(countryCode: string, id: number) {
    try {
      await this.provincesRepository.findUniqueCountry(countryCode);
      const state = await this.provincesRepository.findDivisionById(
        countryCode,
        id,
        DIVISION_LEVEL.DISTRICT,
      );
      if (!state) {
        throw NotFoundRecordException;
      }
      return state;
    } catch (error) {
      console.log('/provinces/d/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async getCityById(countryCode: string, id: number) {
    try {
      await this.provincesRepository.findUniqueCountry(countryCode);
      const state = await this.provincesRepository.findDivisionById(
        countryCode,
        id,
        DIVISION_LEVEL.CITY,
      );
      if (!state) {
        throw NotFoundRecordException;
      }
      return state;
    } catch (error) {
      console.log('/provinces/d/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async getWardById(countryCode: string, id: number) {
    try {
      await this.provincesRepository.findUniqueCountry(countryCode);
      const state = await this.provincesRepository.findDivisionById(
        countryCode,
        id,
        DIVISION_LEVEL.WARD,
      );
      if (!state) {
        throw NotFoundRecordException;
      }
      return state;
    } catch (error) {
      console.log('/provinces/d/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
