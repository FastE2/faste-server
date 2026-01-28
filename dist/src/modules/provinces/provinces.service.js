"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvincesService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const provinces_repository_1 = require("./provinces.repository");
const division_level_constant_1 = require("../../common/constants/division-level.constant");
const prisma_1 = require("../../common/errors/prisma");
let ProvincesService = class ProvincesService {
    provincesRepository;
    constructor(provincesRepository) {
        this.provincesRepository = provincesRepository;
    }
    getCountryById(countryCode) {
        try {
            return this.provincesRepository.findUniqueCountry(countryCode);
        }
        catch (error) {
            console.log('/provinces/:countryCode', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async getStates(countryCode, query) {
        try {
            return await this.provincesRepository.listDivisions(countryCode, division_level_constant_1.DIVISION_LEVEL.STATE, query);
        }
        catch (error) {
            console.log('/provinces/s', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async getDistricts(countryCode, query) {
        try {
            return await this.provincesRepository.listDivisions(countryCode, division_level_constant_1.DIVISION_LEVEL.DISTRICT, query);
        }
        catch (error) {
            console.log('/provinces/d', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async getCities(countryCode, query) {
        try {
            return await this.provincesRepository.listDivisions(countryCode, division_level_constant_1.DIVISION_LEVEL.CITY, query);
        }
        catch (error) {
            console.log('/provinces/d', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async getWards(countryCode, query) {
        try {
            return await this.provincesRepository.listDivisions(countryCode, division_level_constant_1.DIVISION_LEVEL.WARD, query);
        }
        catch (error) {
            console.log('/provinces/w', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async getStateById(countryCode, id) {
        try {
            await this.provincesRepository.findUniqueCountry(countryCode);
            const state = await this.provincesRepository.findDivisionById(countryCode, id, division_level_constant_1.DIVISION_LEVEL.STATE);
            if (!state) {
                throw errors_1.NotFoundRecordException;
            }
            return state;
        }
        catch (error) {
            console.log('/provinces/s/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async getDistrictById(countryCode, id) {
        try {
            await this.provincesRepository.findUniqueCountry(countryCode);
            const state = await this.provincesRepository.findDivisionById(countryCode, id, division_level_constant_1.DIVISION_LEVEL.DISTRICT);
            if (!state) {
                throw errors_1.NotFoundRecordException;
            }
            return state;
        }
        catch (error) {
            console.log('/provinces/d/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async getCityById(countryCode, id) {
        try {
            await this.provincesRepository.findUniqueCountry(countryCode);
            const state = await this.provincesRepository.findDivisionById(countryCode, id, division_level_constant_1.DIVISION_LEVEL.CITY);
            if (!state) {
                throw errors_1.NotFoundRecordException;
            }
            return state;
        }
        catch (error) {
            console.log('/provinces/d/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async getWardById(countryCode, id) {
        try {
            await this.provincesRepository.findUniqueCountry(countryCode);
            const state = await this.provincesRepository.findDivisionById(countryCode, id, division_level_constant_1.DIVISION_LEVEL.WARD);
            if (!state) {
                throw errors_1.NotFoundRecordException;
            }
            return state;
        }
        catch (error) {
            console.log('/provinces/d/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.ProvincesService = ProvincesService;
exports.ProvincesService = ProvincesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provinces_repository_1.ProvincesRepository])
], ProvincesService);
//# sourceMappingURL=provinces.service.js.map