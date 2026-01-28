"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const role_base_constant_1 = require("../src/common/constants/role-base.constant");
const hash_service_1 = require("../src/common/libs/crypto/hash.service");
const prisma_service_1 = require("../src/prisma/prisma.service");
const prisma = new prisma_service_1.PrismaService();
const hashService = new hash_service_1.HashService();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3010);
    const roleCount = await prisma.role.count();
    if (roleCount > 0) {
        throw new Error('Role already exist!');
    }
    const roles = await prisma.role.createMany({
        data: [
            {
                name: role_base_constant_1.ROLE_NAME.ADMIN,
                description: 'Admin role (full permission)',
            },
            {
                name: role_base_constant_1.ROLE_NAME.SELLER,
                description: 'Seller role (manage shop, ...)',
            },
            {
                name: role_base_constant_1.ROLE_NAME.CLIENT,
                description: 'Client role (view, buy product, ...)',
            },
        ],
    });
    const adminRole = await prisma.role.findFirstOrThrow({
        where: {
            name: role_base_constant_1.ROLE_NAME.ADMIN,
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
//# sourceMappingURL=create-base-role.js.map