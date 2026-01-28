import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { DIVISION_LEVEL } from 'src/common/constants/division-level.constant';
export declare class ProvincesRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    private paginate;
    findUniqueCountry(countryCode: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        iso2: string;
        iso3: string | null;
        phoneCode: string | null;
        addressFormat: PrismaJson.AddressFormat | null;
    }>;
    listDivisions(countryCode: string, level: DIVISION_LEVEL, pagination: PaginationQueryType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    findDivisionById(countryCode: string, id: number, level: DIVISION_LEVEL): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    } | null>;
    listStates(countryCode: string, pagination: PaginationQueryType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    listDistricts(countryCode: string, pagination: PaginationQueryType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    listCities(countryCode: string, pagination: PaginationQueryType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    listWards(countryCode: string, pagination: PaginationQueryType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    findStateById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    } | null>;
    findDistrictById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    } | null>;
    findCityById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    } | null>;
    findWardById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    } | null>;
}
