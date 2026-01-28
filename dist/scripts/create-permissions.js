"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const role_base_constant_1 = require("../src/common/constants/role-base.constant");
const common_role_repository_1 = require("../src/common/repositories/common-role.repository");
const prisma_service_1 = require("../src/prisma/prisma.service");
const SellerModule = [
    'AUTH',
    'MEDIA',
    'PRODUCT',
    'PRODUCT-TRANSLATION',
    'PROFILE',
    'CART',
    'ORDERS',
    'REVIEWS',
    'PROVINCES',
    'ADDRESS-SHIP',
    'SHOP',
    'SELLER',
    'FLASHSALES',
];
const ClientModule = [
    'AUTH',
    'MEDIA',
    'PROFILE',
    'CART',
    'ORDERS',
    'REVIEWS',
    'PROVINCES',
    'ADDRESS-SHIP',
    'SHOP',
    'FLASHSALES',
];
const prisma = new prisma_service_1.PrismaService();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3010);
    const commonRoleRepository = app.get(common_role_repository_1.CommonRoleRepository);
    const server = app.getHttpAdapter().getInstance();
    const router = server.router;
    const adminRoleId = await commonRoleRepository.getAdminRoleId();
    console.log('ROLE ID ADMIN', adminRoleId);
    if (!adminRoleId)
        throw new Error('Admin role ID is missing');
    const permissionsInDb = await prisma.permission.findMany({
        where: {
            deletedAt: null,
        },
    });
    const availableRoutes = router.stack
        .map((layer) => {
        if (layer.route) {
            const path = layer.route?.path;
            const method = String(layer.route?.stack[0].method).toUpperCase();
            const moduleName = String(path.split('/')[1]).toUpperCase();
            return {
                path,
                method,
                name: method + ' ' + path,
                module: moduleName,
                createdById: 1,
            };
        }
    })
        .filter((item) => item !== undefined);
    const permissionInDbMap = permissionsInDb.reduce((acc, item) => {
        acc[`${item.method}-${item.path}`] = item;
        return acc;
    }, {});
    const availableRoutesMap = availableRoutes.reduce((acc, item) => {
        acc[`${item.method}-${item.path}`] = item;
        return acc;
    }, {});
    const permissionsToDelete = permissionsInDb.filter((item) => {
        return !availableRoutesMap[`${item.method}-${item.path}`];
    });
    if (permissionsToDelete.length > 0) {
        const deleteResult = await prisma.permission.deleteMany({
            where: {
                id: {
                    in: permissionsToDelete.map((item) => item.id),
                },
            },
        });
        console.log('Deleted permissions:', deleteResult.count);
    }
    else {
        console.log('No permissions to delete');
    }
    const routesToAdd = availableRoutes.filter((item) => {
        return !permissionInDbMap[`${item.method}-${item.path}`];
    });
    if (routesToAdd.length > 0) {
        const permissionsToAdd = await prisma.permission.createMany({
            data: routesToAdd,
            skipDuplicates: true,
        });
        console.log('Added permissions:', permissionsToAdd.count);
    }
    else {
        console.log('No permissions to add');
    }
    const updatedPermissionsInDb = await prisma.permission.findMany({
        where: {
            deletedAt: null,
        },
    });
    const adminPermissionIds = updatedPermissionsInDb.map((item) => ({
        id: item.id,
    }));
    const sellerPermissionIds = updatedPermissionsInDb
        .filter((item) => SellerModule.includes(item.module))
        .map((item) => ({ id: item.id }));
    const clientPermissionIds = updatedPermissionsInDb
        .filter((item) => ClientModule.includes(item.module))
        .map((item) => ({ id: item.id }));
    await Promise.all([
        updateRole(adminPermissionIds, role_base_constant_1.ROLE_NAME.ADMIN),
        updateRole(sellerPermissionIds, role_base_constant_1.ROLE_NAME.SELLER),
        updateRole(clientPermissionIds, role_base_constant_1.ROLE_NAME.CLIENT),
    ]);
    process.exit(0);
}
const updateRole = async (permissionIds, roleName) => {
    const role = await prisma.role.findFirstOrThrow({
        where: {
            name: roleName,
            deletedAt: null,
        },
    });
    await prisma.role.update({
        where: {
            id: role.id,
        },
        data: {
            permissions: {
                set: permissionIds,
            },
        },
    });
};
bootstrap();
//# sourceMappingURL=create-permissions.js.map