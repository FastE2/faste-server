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
exports.LanguageRepository = void 0;
const prisma_service_1 = require("../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let LanguageRepository = class LanguageRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    list() {
        return this.prismaService.language.findMany({
            where: {
                deletedAt: null,
            },
        });
    }
    findById(id) {
        return this.prismaService.language.findUnique({
            where: {
                id,
                deletedAt: null,
            },
        });
    }
    async create(data) {
        const existing = await this.prismaService.language.findFirst({
            where: {
                name: data.name,
                deletedAt: null,
            },
        });
        if (existing) {
            throw new Error(`Language with name "${data.name}" already exists.`);
        }
        return this.prismaService.language.create({
            data,
        });
    }
    update({ id, updatedById, data, }) {
        return this.prismaService.language.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                ...data,
                updatedById,
            },
        });
    }
    delete({ id, deletedById, }, isHard) {
        return isHard
            ? this.prismaService.language.delete({
                where: {
                    id,
                },
            })
            : this.prismaService.language.update({
                where: {
                    id,
                    deletedAt: null,
                },
                data: {
                    deletedAt: new Date(),
                    deletedById,
                },
            });
    }
};
exports.LanguageRepository = LanguageRepository;
exports.LanguageRepository = LanguageRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LanguageRepository);
//# sourceMappingURL=language.repository.js.map