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
exports.AddressShipRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AddressShipRepository = class AddressShipRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async list(userId, pagination) {
        const skip = (pagination.page - 1) * pagination.limit;
        const take = pagination.limit;
        const [data, totalItem] = await Promise.all([
            this.prismaService.addressShip.findMany({
                where: {
                    userId,
                    deletedAt: null,
                },
                take,
                skip,
            }),
            this.prismaService.addressShip.count({
                where: {
                    userId,
                    deletedAt: null,
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
    findById(userId, id) {
        return this.prismaService.addressShip.findUnique({
            where: {
                id,
                userId,
                deletedAt: null,
            },
        });
    }
    findByIdIsDefault(id) {
        return this.prismaService.addressShip.findUnique({
            where: {
                id,
                isDefault: true,
                deletedAt: null,
            },
        });
    }
    create({ userId, data, }) {
        return this.prismaService.addressShip.create({
            data: {
                ...data,
                userId,
                geoinfo: data.geoinfo ?? client_1.Prisma.JsonNull,
            },
        });
    }
    async update({ id, userId, data, }) {
        return this.prismaService.addressShip.update({
            where: {
                id,
                userId,
                deletedAt: null,
            },
            data: {
                ...data,
                geoinfo: data.geoinfo ?? client_1.Prisma.JsonNull,
            },
        });
    }
    delete({ id, userId, }, isHard) {
        return isHard
            ? this.prismaService.addressShip.delete({
                where: {
                    id,
                    userId,
                },
            })
            : this.prismaService.addressShip.update({
                where: {
                    id,
                    userId,
                    deletedAt: null,
                },
                data: {
                    deletedAt: new Date(),
                },
            });
    }
};
exports.AddressShipRepository = AddressShipRepository;
exports.AddressShipRepository = AddressShipRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressShipRepository);
//# sourceMappingURL=address-ship.repository.js.map