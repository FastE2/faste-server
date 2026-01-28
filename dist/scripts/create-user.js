"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const hash_service_1 = require("../src/common/libs/crypto/hash.service");
const prisma_service_1 = require("../src/prisma/prisma.service");
const prisma = new prisma_service_1.PrismaService();
const hashService = new hash_service_1.HashService();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
//# sourceMappingURL=create-user.js.map