import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ApiWard = {
  code: number;
  codename: string;
  district_code?: number;
  division_type: string;
  name: string;
};

type ApiDistrict = {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  province_code?: number;
  wards: ApiWard[];
};

type ApiProvince = {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  phone_code?: number;
  districts: ApiDistrict[];
};

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log('Start seeding provinces -> districts -> wards');

  // 1) fetch full data depth=3
  const API_URL = 'https://provinces.open-api.vn/api/?depth=3';
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch provinces: ${res.status} ${res.statusText}`);
  }
  const provinces: ApiProvince[] = await res.json();
  console.log(`Fetched ${provinces.length} provinces`);

  // 2) ensure Country VN exists (iso2 unique)
  const countryIso2 = 'VN';
  const country = await prisma.country.upsert({
    where: { iso2: countryIso2 },
    update: {
      name: 'Việt Nam',
      phoneCode: '+84',
      updatedAt: new Date(),
    },
    create: {
      iso2: countryIso2,
      iso3: 'VNM',
      name: 'Việt Nam',
      phoneCode: '+84',
    },
  });
  console.log('Country ensured:', country.iso2, country.name);

  // 3) iterate provinces
  for (const prov of provinces) {
    // small throttling
    await sleep(30);

    // try find existing state by name + country
    let state = await prisma.state.findFirst({
      where: {
        name: prov.name,
        countryId: country.id,
      },
    });

    if (!state) {
      state = await prisma.state.create({
        data: {
          countryId: country.id,
          name: prov.name,
          code: String(prov.code),
        },
      });
      console.log(`Created state: ${prov.name} (id=${state.id})`);
    } else {
      // optionally update code if missing
      if (!state.code && prov.code != null) {
        state = await prisma.state.update({
          where: { id: state.id },
          data: { code: String(prov.code) },
        });
        console.log(`Updated state.code for ${prov.name}`);
      } else {
        console.log(`State exists: ${prov.name} (id=${state.id})`);
      }
    }

    // 4) districts inside province
    if (Array.isArray(prov.districts)) {
      for (const d of prov.districts) {
        await sleep(10);

        // find or create district by name + stateId
        let district = await prisma.district.findFirst({
          where: {
            name: d.name,
            stateId: state.id,
          },
        });

        if (!district) {
          district = await prisma.district.create({
            data: {
              stateId: state.id,
              name: d.name,
            },
          });
          console.log(`  Created district: ${d.name} (id=${district.id})`);
        } else {
          console.log(`  District exists: ${d.name} (id=${district.id})`);
        }

        // 5) wards inside district
        if (Array.isArray(d.wards)) {
          for (const w of d.wards) {
            // tiny throttle
            // NOTE: some provinces have many wards; adjust if needed
            await sleep(5);

            // find or create ward by name + districtId
            const existingWard = await prisma.ward.findFirst({
              where: {
                name: w.name,
                districtId: district.id,
              },
            });

            if (!existingWard) {
              await prisma.ward.create({
                data: {
                  districtId: district.id,
                  name: w.name,
                },
              });
              console.log(`    Created ward: ${w.name}`);
            } else {
              // nothing to update for now
            }
          } // wards loop
        }
      } // districts loop
    } // if districts
  } // provinces loop

  console.log('Seeding complete');
}

main()
  .catch(async (err) => {
    console.error('Seed failed', err);
    await prisma.$disconnect();
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
