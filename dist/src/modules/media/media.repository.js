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
exports.MediaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MediaRepository = class MediaRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(data) {
        return this.prismaService.file.create({
            data,
        });
    }
    async list(query) {
        const take = query.limit;
        const skip = (query.page - 1) * query.limit;
        const [data, totalCount] = await Promise.all([
            this.prismaService.file.findMany({
                take,
                skip,
            }),
            this.prismaService.file.count(),
        ]);
        const totalPage = Math.ceil(totalCount / query.limit);
        return {
            data,
            page: query.page,
            limit: query.limit,
            totalPage,
        };
    }
    delete(key) {
        return this.prismaService.file.delete({
            where: {
                key,
            },
        });
    }
};
exports.MediaRepository = MediaRepository;
exports.MediaRepository = MediaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MediaRepository);
//# sourceMappingURL=media.repository.js.map