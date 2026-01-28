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
exports.DeliveryTypeService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const delivery_type_repository_1 = require("./delivery-type.repository");
const prisma_1 = require("../../common/errors/prisma");
let DeliveryTypeService = class DeliveryTypeService {
    deliveryTypeRepository;
    constructor(deliveryTypeRepository) {
        this.deliveryTypeRepository = deliveryTypeRepository;
    }
    async getAllDeliveryTypes(query) {
        try {
            return await this.deliveryTypeRepository.list(query);
        }
        catch (error) {
            console.log('/delivery-type', error);
            throw error;
        }
    }
    async getDeliveryTypeById(id) {
        try {
            const deliveryType = await this.deliveryTypeRepository.findById(id);
            if (!deliveryType) {
                throw errors_1.NotFoundRecordException;
            }
            return deliveryType;
        }
        catch (error) {
            console.log('/delivery-type/:id', error);
            throw error;
        }
    }
    async createDeliveryType({ data, createdById, }) {
        try {
            const deliveryType = await this.deliveryTypeRepository.create({
                createdById,
                data,
            });
            return deliveryType;
        }
        catch (error) {
            console.log('/delivery-type', error);
            throw error;
        }
    }
    async updateDeliveryType({ id, data, updatedById, }) {
        try {
            const updatedDeliveryType = await this.deliveryTypeRepository.update({
                id,
                updatedById,
                data,
            });
            return updatedDeliveryType;
        }
        catch (error) {
            console.log('/delivery-type/:id', error);
            throw error;
        }
    }
    async deleteDeliveryType({ id, deletedById, }) {
        try {
            await this.deliveryTypeRepository.delete({ id, deletedById });
            return { message: 'Delete delivery type successfully' };
        }
        catch (error) {
            console.log('/delivery-type/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.DeliveryTypeService = DeliveryTypeService;
exports.DeliveryTypeService = DeliveryTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [delivery_type_repository_1.DeliveryTypeRepository])
], DeliveryTypeService);
//# sourceMappingURL=delivery-type.service.js.map