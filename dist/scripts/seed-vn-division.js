"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const API_BASE = process.env.PROVINCES_API_BASE ?? 'https://provinces.open-api.vn/api';
async function upsertCountry() {
    const iso2 = 'VN';
    const name = 'Việt Nam';
    const phoneCode = '+84';
    const country = await prisma.country.upsert({
        where: { iso2 },
        create: {
            iso2,
            name,
            phoneCode,
        },
        update: {
            name,
            phoneCode,
        },
    });
    return country;
}
function mapProvinceLevel(divisionType) {
    if (!divisionType)
        return client_1.DivisionLevel.STATE;
    const dt = divisionType.toLowerCase();
    if (dt.includes('thành phố'))
        return client_1.DivisionLevel.CITY;
    return client_1.DivisionLevel.STATE;
}
async function main() {
    console.log(`Fetching provinces from ${API_BASE} (depth=3)...`);
    const res = await axios_1.default.get(`${API_BASE}/?depth=3`);
    const provinces = res.data;
    console.log(`Got ${provinces.length} provinces`);
    const country = await upsertCountry();
    console.log(`Using country id=${country.id} (${country.iso2})`);
    for (const p of provinces) {
        const provinceCodeStr = String(p.code);
        const provinceLevel = mapProvinceLevel(p.division_type);
        const upsertedProvince = await prisma.administrativeDivision.upsert({
            where: { code: provinceCodeStr },
            create: {
                code: provinceCodeStr,
                name: p.name,
                level: provinceLevel,
                countryId: country.id,
            },
            update: {
                name: p.name,
                level: provinceLevel,
                countryId: country.id,
            },
        });
        console.log(`Upserted province ${upsertedProvince.name} (code=${provinceCodeStr}) => id=${upsertedProvince.id}`);
        const districts = p.districts ?? [];
        for (const d of districts) {
            const districtCodeStr = String(d.code);
            const upsertedDistrict = await prisma.administrativeDivision.upsert({
                where: { code: districtCodeStr },
                create: {
                    code: districtCodeStr,
                    name: d.name,
                    level: client_1.DivisionLevel.DISTRICT,
                    countryId: country.id,
                    parentId: upsertedProvince.id,
                },
                update: {
                    name: d.name,
                    level: client_1.DivisionLevel.DISTRICT,
                    countryId: country.id,
                    parentId: upsertedProvince.id,
                },
            });
            console.log(`  Upserted district ${upsertedDistrict.name} (code=${districtCodeStr}) => id=${upsertedDistrict.id}`);
            const wards = (d).wards ?? [];
            for (const w of wards) {
                const wardCodeStr = String(w.code);
                const upsertedWard = await prisma.administrativeDivision.upsert({
                    where: { code: wardCodeStr },
                    create: {
                        code: wardCodeStr,
                        name: w.name,
                        level: client_1.DivisionLevel.WARD,
                        countryId: country.id,
                        parentId: upsertedDistrict.id,
                    },
                    update: {
                        name: w.name,
                        level: client_1.DivisionLevel.WARD,
                        countryId: country.id,
                        parentId: upsertedDistrict.id,
                    },
                });
            }
        }
    }
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error('Error in seeding:', e);
    process.exitCode = 1;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-vn-division.js.map