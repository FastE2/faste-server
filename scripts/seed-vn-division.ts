/*
Seed script: import Vietnam Provinces API data into your Prisma models
- File: prisma/seed-vn-provinces.ts
- Assumes your Prisma schema contains models `Country` and `AdministrativeDivision` as provided.

Usage:
  1. Install deps: npm install axios
  2. Run (if you use ts-node): npx ts-node prisma/seed-vn-provinces.ts
     Or compile to JS and run with node.

Notes:
- The script upserts (create or update) a Country with iso2 = 'VN' and then upserts provinces -> districts -> wards.
- It maps province division_type containing "thành phố" to DivisionLevel.CITY, otherwise to DivisionLevel.STATE.
- Districts -> DivisionLevel.DISTRICT, Wards -> DivisionLevel.WARD.
- API base can be overridden by setting env var PROVINCES_API_BASE.
- If your Prisma enum values differ, adjust the mapping.
*/

import 'dotenv/config';
import axios from 'axios';
import { PrismaClient, DivisionLevel } from '@prisma/client';

const prisma = new PrismaClient();
const API_BASE =
  process.env.PROVINCES_API_BASE ?? 'https://provinces.open-api.vn/api';

// Types returned by the provinces API (partial, only fields we need)
type ApiWard = {
  code: number;
  codename?: string;
  district_code?: number;
  division_type?: string;
  name: string;
};

type ApiDistrict = {
  code: number;
  codename?: string;
  division_type?: string;
  name: string;
  province_code?: number;
  wards?: ApiWard[];
};

type ApiProvince = {
  code: number;
  codename?: string;
  districts?: ApiDistrict[];
  division_type?: string; // e.g. "tỉnh", "thành phố trực thuộc trung ương"
  name: string;
  phone_code?: number;
};

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
      // you can set addressFormat if you want
    },
    update: {
      name,
      phoneCode,
    },
  });

  return country;
}

function mapProvinceLevel(divisionType?: string): DivisionLevel {
  if (!divisionType) return DivisionLevel.STATE;
  const dt = divisionType.toLowerCase();
  if (dt.includes('thành phố')) return DivisionLevel.CITY;
  // fallback: treat as state/province
  return DivisionLevel.STATE;
}

async function main() {
  console.log(`Fetching provinces from ${API_BASE} (depth=3)...`);
  const res = await axios.get<ApiProvince[]>(`${API_BASE}/?depth=3`);
  const provinces = res.data;
  console.log(`Got ${provinces.length} provinces`);

  const country = await upsertCountry();
  console.log(`Using country id=${country.id} (${country.iso2})`);

  // Iterate provinces
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
        // parentId is null for top-level provinces
      },
      update: {
        name: p.name,
        level: provinceLevel,
        countryId: country.id,
      },
    });

    console.log(
      `Upserted province ${upsertedProvince.name} (code=${provinceCodeStr}) => id=${upsertedProvince.id}`,
    );

    // Districts
    const districts = p.districts ?? [];
    for (const d of districts) {
      const districtCodeStr = String(d.code);

      const upsertedDistrict = await prisma.administrativeDivision.upsert({
        where: { code: districtCodeStr },
        create: {
          code: districtCodeStr,
          name: d.name,
          level: DivisionLevel.DISTRICT,
          countryId: country.id,
          parentId: upsertedProvince.id,
        },
        update: {
          name: d.name,
          level: DivisionLevel.DISTRICT,
          countryId: country.id,
          parentId: upsertedProvince.id,
        },
      });

      console.log(
        `  Upserted district ${upsertedDistrict.name} (code=${districtCodeStr}) => id=${upsertedDistrict.id}`,
      );

      // Wards
      const wards = (d).wards ?? [];
      for (const w of wards) {
        const wardCodeStr = String(w.code);

        const upsertedWard = await prisma.administrativeDivision.upsert({
          where: { code: wardCodeStr },
          create: {
            code: wardCodeStr,
            name: w.name,
            level: DivisionLevel.WARD,
            countryId: country.id,
            parentId: upsertedDistrict.id,
          },
          update: {
            name: w.name,
            level: DivisionLevel.WARD,
            countryId: country.id,
            parentId: upsertedDistrict.id,
          },
        });

        // Don't spam logs for every ward, but give a small confirmation
        // Uncomment next line if you want per-ward logs:
        // console.log(`    Upserted ward ${upsertedWard.name} (code=${wardCodeStr}) => id=${upsertedWard.id}`);
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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
