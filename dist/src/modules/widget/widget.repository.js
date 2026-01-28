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
exports.WidgetRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let WidgetRepository = class WidgetRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async listByShopInTemplate(templateId) {
        return this.prismaService.widget.findMany({
            where: {
                templateId: templateId,
            },
        });
    }
    listByShopInTemplateIsPublic(templateId) {
        return this.prismaService.widget.findMany({
            where: {
                templateId,
                isVisible: true,
            },
        });
    }
    findById(id) {
        return this.prismaService.widget.findUnique({
            where: {
                id,
            },
        });
    }
    create({ sellerId, data, }) {
        return this.prismaService.widget.create({
            data: {
                ...data,
            },
        });
    }
    async update({ id, data, }) {
        const { name, ...rest } = data;
        const updateData = { ...rest };
        if (name !== undefined) {
            if (name !== null) {
                updateData.name = name;
            }
        }
        return this.prismaService.template.update({
            where: {
                id,
            },
            data: updateData,
        });
    }
    delete({ id }) {
        return this.prismaService.widget.delete({
            where: {
                id,
            },
        });
    }
};
exports.WidgetRepository = WidgetRepository;
exports.WidgetRepository = WidgetRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WidgetRepository);
//# sourceMappingURL=widget.repository.js.map