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
exports.LanguageService = void 0;
const common_1 = require("@nestjs/common");
const language_repository_1 = require("./language.repository");
const errors_1 = require("../../common/errors");
const client_1 = require("@prisma/client");
let LanguageService = class LanguageService {
    languageRepository;
    constructor(languageRepository) {
        this.languageRepository = languageRepository;
    }
    async findAll() {
        try {
            return await this.languageRepository.list();
        }
        catch (error) {
            console.log('/language');
            throw error;
        }
    }
    async findOne(params) {
        try {
            const language = await this.languageRepository.findById(params.id);
            if (!language) {
                throw errors_1.NotFoundRecordException;
            }
            return language;
        }
        catch (error) {
            console.log('/language/:id');
            throw error;
        }
    }
    async create(data, createdById) {
        try {
            return await this.languageRepository.create({
                ...data,
                createdById,
            });
        }
        catch (error) {
            console.log('/language');
            throw error;
        }
    }
    async update(id, data, updatedById) {
        try {
            return await this.languageRepository.update({ id, data, updatedById });
        }
        catch (error) {
            console.log('/language/:id');
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async delete({ id, deletedById }) {
        try {
            await this.languageRepository.delete({ id, deletedById });
            return { message: 'Delete language successfully' };
        }
        catch (error) {
            console.log('/language/:id');
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.LanguageService = LanguageService;
exports.LanguageService = LanguageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [language_repository_1.LanguageRepository])
], LanguageService);
//# sourceMappingURL=language.service.js.map