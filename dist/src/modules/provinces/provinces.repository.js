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
exports.ProvincesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const division_level_constant_1 = require("../../common/constants/division-level.constant");
let ProvincesRepository = class ProvincesRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async paginate(model, where, pagination) {
        const skip = (pagination.page - 1) * pagination.limit;
        const take = pagination.limit;
        where = { ...where, parentId: pagination.parentId };
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
    async findUniqueCountry(countryCode) {
        return await this.prismaService.country.findUniqueOrThrow({
            where: {
                iso2: countryCode.toUpperCase(),
            },
        });
    }
    async listDivisions(countryCode, level, pagination) {
        const country = await this.findUniqueCountry(countryCode);
        return this.paginate(this.prismaService.administrativeDivision, { countryId: country.id, level }, pagination);
    }
    async findDivisionById(countryCode, id, level) {
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
    async listStates(countryCode, pagination) {
        const country = await this.findUniqueCountry(countryCode);
        return this.paginate(this.prismaService.administrativeDivision, { countryId: country.id, level: division_level_constant_1.DIVISION_LEVEL.STATE }, pagination);
    }
    async listDistricts(countryCode, pagination) {
        const country = await this.findUniqueCountry(countryCode);
        return this.paginate(this.prismaService.administrativeDivision, { countryId: country.id, level: division_level_constant_1.DIVISION_LEVEL.DISTRICT }, pagination);
    }
    async listCities(countryCode, pagination) {
        const country = await this.findUniqueCountry(countryCode);
        return this.paginate(this.prismaService.administrativeDivision, { countryId: country.id, level: division_level_constant_1.DIVISION_LEVEL.CITY }, pagination);
    }
    async listWards(countryCode, pagination) {
        const country = await this.findUniqueCountry(countryCode);
        return this.paginate(this.prismaService.administrativeDivision, { countryId: country.id, level: division_level_constant_1.DIVISION_LEVEL.WARD }, pagination);
    }
    async findStateById(countryCode, id) {
        return this.prismaService.administrativeDivision.findFirst({
            where: {
                id,
                level: division_level_constant_1.DIVISION_LEVEL.STATE,
                country: { iso2: countryCode },
            },
        });
    }
    async findDistrictById(countryCode, id) {
        return this.prismaService.administrativeDivision.findFirst({
            where: {
                id,
                level: division_level_constant_1.DIVISION_LEVEL.DISTRICT,
                country: { iso2: countryCode },
            },
        });
    }
    async findCityById(countryCode, id) {
        return this.prismaService.administrativeDivision.findFirst({
            where: {
                id,
                level: division_level_constant_1.DIVISION_LEVEL.CITY,
                country: { iso2: countryCode },
            },
        });
    }
    async findWardById(countryCode, id) {
        return this.prismaService.administrativeDivision.findFirst({
            where: {
                id,
                level: division_level_constant_1.DIVISION_LEVEL.WARD,
                country: { iso2: countryCode },
            },
        });
    }
};
exports.ProvincesRepository = ProvincesRepository;
exports.ProvincesRepository = ProvincesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProvincesRepository);
//# sourceMappingURL=provinces.repository.js.map