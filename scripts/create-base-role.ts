import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ROLE_NAME } from 'src/common/constants/role-base.constant';
import { HashService } from 'src/common/libs/crypto/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';

const prisma = new PrismaService();
const hashService = new HashService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const hashService = app.get(HashService); // C2

  await app.listen(3010);
  const roleCount = await prisma.role.count();
  if (roleCount > 0) {
    throw new Error('Role already exist!');
  }

  const roles = await prisma.role.createMany({
    data: [
      {
        name: ROLE_NAME.ADMIN,
        description: 'Admin role (full permission)',
      },
      {
        name: ROLE_NAME.SELLER,
        description: 'Seller role (manage shop, ...)',
      },
      {
        name: ROLE_NAME.CLIENT,
        description: 'Client role (view, buy product, ...)',
      },
    ],
  });

  const adminRole = await prisma.role.findFirstOrThrow({
    where: {
      name: ROLE_NAME.ADMIN,
    },
  });
  const passwordHash = await hashService.hash('env');
  const adminUser = await prisma.user.create({
    data: {
      email: 'env',
      phoneNumber: 'env',
      name: 'env',
      password: passwordHash,
      roleId: adminRole.id,
    },
  });
  return { adminUser, createdRoleCount: roles.count };
}

void bootstrap()
  .then(({ adminUser, createdRoleCount }) => {
    console.log(`Created ${createdRoleCount} roles`);
    console.log(`Created admin user: ${adminUser.email}`);
  })
  .catch(console.error);
