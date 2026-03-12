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
exports.ShopRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const common_role_repository_1 = require("../../common/repositories/common-role.repository");
let ShopRepository = class ShopRepository {
    prismaService;
    commonRoleRepository;
    constructor(prismaService, commonRoleRepository) {
        this.prismaService = prismaService;
        this.commonRoleRepository = commonRoleRepository;
    }
    async findAll(pagination, isPublic) {
        const skip = (pagination.page - 1) * pagination.limit;
        const take = pagination.limit;
        const where = { deletedAt: null };
        if (isPublic) {
            where.status = 'APPROVED';
            where.isActive = true;
        }
        else {
            if (pagination.status) {
                where.status = pagination.status;
            }
        }
        const [data, totalItem] = await Promise.all([
            this.prismaService.shop.findMany({
                where,
                take,
                skip,
            }),
            this.prismaService.shop.count({
                where: {
                    deletedAt: null,
                    ...where,
                },
            }),
        ]);
        return {
            data,
            totalItem,
            page: pagination.page,
            limmit: pagination.limit,
            totalPage: Math.ceil(totalItem / pagination.limit),
        };
    }
    findOne(where, fillter) {
        return this.prismaService.shop.findFirst({
            where: {
                ...where,
                deletedAt: null,
                ...fillter,
            },
            include: {
                Template: {
                    where: {
                        isActive: true,
                    },
                    include: {
                        widgets: true,
                    },
                },
            },
        });
    }
    create({ userId, data, }) {
        const { deliveryTypeIds, ...fillterData } = data;
        return this.prismaService.$transaction(async (tx) => {
            const roleSellerId = await this.commonRoleRepository.getSellerRoleId();
            await tx.user.update({
                where: {
                    id: userId,
                },
                data: {
                    roleId: roleSellerId,
                },
            });
            const shop = await tx.shop.create({
                data: {
                    ...fillterData,
                    shopid: userId,
                    shopShipping: {
                        connect: deliveryTypeIds?.map((id) => ({ id })) ?? [],
                    },
                },
            });
            return shop;
        });
    }
    async update({ id, data, }) {
        return this.prismaService.shop.update({
            where: {
                shopid: id,
                deletedAt: null,
            },
            data: {
                ...data,
            },
        });
    }
    delete({ id, deletedById, }, isHard) {
        return isHard
            ? this.prismaService.shop.delete({
                where: {
                    shopid: id,
                },
            })
            : this.prismaService.shop.update({
                where: {
                    shopid: id,
                    deletedAt: null,
                },
                data: {
                    deletedAt: new Date(),
                    deletedById,
                },
            });
    }
};
exports.ShopRepository = ShopRepository;
exports.ShopRepository = ShopRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        common_role_repository_1.CommonRoleRepository])
], ShopRepository);
//# sourceMappingURL=shop.repository.js.map