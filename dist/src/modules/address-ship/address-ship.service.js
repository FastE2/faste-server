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
exports.AddressShipService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const address_ship_repository_1 = require("./address-ship.repository");
const prisma_1 = require("../../common/errors/prisma");
let AddressShipService = class AddressShipService {
    addressShipRepository;
    constructor(addressShipRepository) {
        this.addressShipRepository = addressShipRepository;
    }
    async getAllAddressShips(userId, query) {
        try {
            return await this.addressShipRepository.list(userId, query);
        }
        catch (error) {
            console.log('/address-ship', error);
            throw error;
        }
    }
    async getAddressShipById(userId, id) {
        try {
            const addressShip = await this.addressShipRepository.findById(userId, id);
            if (!addressShip) {
                throw errors_1.NotFoundRecordException;
            }
            return addressShip;
        }
        catch (error) {
            console.log('/address-ship/:id', error);
            throw error;
        }
    }
    async getAddressShipByIdIsDefault(id) {
        try {
            const addressShip = await this.addressShipRepository.findByIdIsDefault(id);
            if (!addressShip) {
                throw errors_1.NotFoundRecordException;
            }
            return addressShip;
        }
        catch (error) {
            console.log('/address-ship/:id', error);
            throw error;
        }
    }
    async createAddressShip({ data, userId, }) {
        try {
            const addressShip = await this.addressShipRepository.create({
                userId,
                data,
            });
            return addressShip;
        }
        catch (error) {
            console.log('/address-ship', error);
            throw error;
        }
    }
    async updateAddressShip({ id, data, userId, }) {
        try {
            const updatedAddressShip = await this.addressShipRepository.update({
                id,
                userId,
                data,
            });
            return updatedAddressShip;
        }
        catch (error) {
            console.log('/address-ship/:id', error);
            throw error;
        }
    }
    async deleteAddressShip({ id, userId }) {
        try {
            await this.addressShipRepository.delete({ id, userId });
            return { message: 'Delete addressShip successfully' };
        }
        catch (error) {
            console.log('/address-ship/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.AddressShipService = AddressShipService;
exports.AddressShipService = AddressShipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [address_ship_repository_1.AddressShipRepository])
], AddressShipService);
//# sourceMappingURL=address-ship.service.js.map