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
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const prisma_1 = require("../../common/errors/prisma");
const template_repository_1 = require("./template.repository");
let TemplateService = class TemplateService {
    templateRepository;
    constructor(templateRepository) {
        this.templateRepository = templateRepository;
    }
    async getAllTemplates(query) {
        try {
            return await this.templateRepository.list(query);
        }
        catch (error) {
            console.log('/template', error);
            throw error;
        }
    }
    async getAllTemplatesByShop(query, sellerId) {
        try {
            return await this.templateRepository.listByShop(query, sellerId);
        }
        catch (error) {
            console.log('/template', error);
            throw error;
        }
    }
    async getTemplateIdIsPublic(id) {
        try {
            const template = await this.templateRepository.findByIdIsPublic(id);
            if (!template) {
                throw errors_1.NotFoundRecordException;
            }
            return template;
        }
        catch (error) {
            console.log('/template/:id', error);
            throw error;
        }
    }
    async createTemplate({ data, createdById, }) {
        try {
            const brand = await this.templateRepository.create({
                sellerId: createdById,
                data,
            });
            return brand;
        }
        catch (error) {
            console.log('/brand', error);
            throw error;
        }
    }
    async updateTemplate({ id, data, updatedById, }) {
        try {
            const updatedTemplate = await this.templateRepository.update({
                id,
                data,
            });
            return updatedTemplate;
        }
        catch (error) {
            console.log('/template/:id', error);
            throw error;
        }
    }
    async deleteTemplate({ id, deletedById, }) {
        try {
            await this.templateRepository.delete({ id });
            return { message: 'Delete template successfully' };
        }
        catch (error) {
            console.log('/template/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.TemplateService = TemplateService;
exports.TemplateService = TemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [template_repository_1.TemplateRepository])
], TemplateService);
//# sourceMappingURL=template.service.js.map