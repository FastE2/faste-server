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
exports.WidgetService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const prisma_1 = require("../../common/errors/prisma");
const widget_repository_1 = require("./widget.repository");
const prisma_service_1 = require("../../prisma/prisma.service");
let WidgetService = class WidgetService {
    widgetRepository;
    prismaService;
    constructor(widgetRepository, prismaService) {
        this.widgetRepository = widgetRepository;
        this.prismaService = prismaService;
    }
    async getAllWidgetsByTemplate(templateId, userId) {
        try {
            return await this.widgetRepository.listByShopInTemplate(templateId);
        }
        catch (error) {
            console.log('/widget', error);
            throw error;
        }
    }
    async getAllWidgetsByTemplateIsPublic(templateId) {
        try {
            return await this.widgetRepository.listByShopInTemplateIsPublic(templateId);
        }
        catch (error) {
            console.log('/widget', error);
            throw error;
        }
    }
    async getWidgetId(id) {
        try {
            const template = await this.widgetRepository.findById(id);
            if (!template) {
                throw errors_1.NotFoundRecordException;
            }
            return template;
        }
        catch (error) {
            console.log('/widget/:id', error);
            throw error;
        }
    }
    async createWidget({ data, createdById, }) {
        try {
            const brand = await this.widgetRepository.create({
                sellerId: createdById,
                data,
            });
            return brand;
        }
        catch (error) {
            console.log('/widget', error);
            throw error;
        }
    }
    async updateWidget({ id, data, updatedById, }) {
        try {
            const updatedWidget = await this.widgetRepository.update({
                id,
                data,
            });
            return updatedWidget;
        }
        catch (error) {
            console.log('/widget/:id', error);
            throw error;
        }
    }
    async updateWidgets(templateId, data) {
        const { widgets: newWidgets } = data;
        return this.prismaService.$transaction(async (tx) => {
            const oldWidgets = await tx.widget.findMany({
                where: {
                    templateId,
                },
                select: {
                    id: true,
                    widgetIndex: true,
                    viewConfig: true,
                    type: true,
                    name: true,
                    isVisible: true,
                },
                orderBy: { widgetIndex: 'asc' },
            });
            const updates = [];
            for (const newW of newWidgets) {
                const oldW = oldWidgets.find((w) => w.id === newW.id);
                if (!oldW)
                    continue;
                const isChanged = oldW.widgetIndex !== newW.widgetIndex ||
                    oldW.name !== newW.name ||
                    oldW.type !== newW.type ||
                    oldW.isVisible !== newW.isVisible ||
                    JSON.stringify(oldW.viewConfig) !== JSON.stringify(newW.viewConfig);
                if (isChanged) {
                    updates.push(tx.widget.update({
                        where: { id: newW.id },
                        data: {
                            widgetIndex: newW.widgetIndex,
                            name: newW.name,
                            type: newW.type,
                            viewConfig: newW.viewConfig,
                            isVisible: newW.isVisible,
                        },
                    }));
                }
            }
            if (updates.length === 0) {
                return { message: 'No changes detected' };
            }
            await Promise.all(updates);
            return {
                message: 'Widgets updated successfully',
                updated: updates.length,
            };
        });
    }
    async deleteWidget({ id, deletedById }) {
        try {
            const deleted = await this.widgetRepository.findById(id);
            if (!deleted)
                throw new Error('Widget not found');
            const deletedIndex = deleted.widgetIndex;
            await this.widgetRepository.delete({ id });
            await this.prismaService.widget.updateMany({
                where: {
                    widgetIndex: { gt: deletedIndex },
                    templateId: deleted.templateId,
                },
                data: {
                    widgetIndex: { decrement: 1 },
                },
            });
            return { message: 'Delete widget successfully' };
        }
        catch (error) {
            console.log('/widget/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.WidgetService = WidgetService;
exports.WidgetService = WidgetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [widget_repository_1.WidgetRepository,
        prisma_service_1.PrismaService])
], WidgetService);
//# sourceMappingURL=widget.service.js.map