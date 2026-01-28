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
exports.CommonRoleRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const role_base_constant_1 = require("../constants/role-base.constant");
let CommonRoleRepository = class CommonRoleRepository {
    prismaService;
    clientRoleId = null;
    adminRoleId = null;
    sellerRoleId = null;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getRole(roleName) {
        const role = await this.prismaService.$queryRaw `
    SELECT * FROM "Role" WHERE name = ${roleName} AND "deletedAt" IS NULL LIMIT 1;
  `.then((res) => {
            if (res.length === 0) {
                throw new Error('Role not found');
            }
            return res[0];
        });
        return role;
    }
    async getClientRoleId() {
        if (this.clientRoleId) {
            return this.clientRoleId;
        }
        const role = await this.getRole(role_base_constant_1.ROLE_NAME.CLIENT);
        this.clientRoleId = role.id;
        return this.clientRoleId;
    }
    async getAdminRoleId() {
        if (this.adminRoleId) {
            return this.adminRoleId;
        }
        const role = await this.getRole(role_base_constant_1.ROLE_NAME.ADMIN);
        this.adminRoleId = role.id;
        return this.adminRoleId;
    }
    async getSellerRoleId() {
        if (this.sellerRoleId) {
            return this.sellerRoleId;
        }
        const role = await this.getRole(role_base_constant_1.ROLE_NAME.SELLER);
        this.sellerRoleId = role.id;
        return this.sellerRoleId;
    }
};
exports.CommonRoleRepository = CommonRoleRepository;
exports.CommonRoleRepository = CommonRoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommonRoleRepository);
//# sourceMappingURL=common-role.repository.js.map