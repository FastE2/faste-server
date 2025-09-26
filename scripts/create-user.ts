import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ROLE_NAME } from 'src/common/constants/role-base.constant';
import { HashService } from 'src/common/libs/crypto/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';

const prisma = new PrismaService();
const hashService = new HashService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3010);

  const passwordHash = await hashService.hash('123456');
  const client = await prisma.user.create({
    data: {
      email: 'seller1@example.com',
      phoneNumber: '0123456789',
      name: 'Seller One',
      password: passwordHash,
      roleId: 2,
    },
  });
  return { client };
}

void bootstrap()
  .then(({ client }) => {
    console.log(`Created admin user: ${client.email}`);
  })
  .catch(console.error);
