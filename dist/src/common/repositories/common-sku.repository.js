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
exports.CommonSKURepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CommonSKURepository = class CommonSKURepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    findUniqueSKU(where) {
        return this.prismaService.sKU.findFirst({
            where: {
                ...where,
                deletedAt: null,
            },
            include: {
                product: true,
            },
        });
    }
    async findManySKU({ ids, createdById, }) {
        return this.prismaService.sKU.findMany({
            where: {
                id: { in: ids },
                shopId: createdById,
            },
            include: {
                product: true,
            },
        });
    }
};
exports.CommonSKURepository = CommonSKURepository;
exports.CommonSKURepository = CommonSKURepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommonSKURepository);
//# sourceMappingURL=common-sku.repository.js.map