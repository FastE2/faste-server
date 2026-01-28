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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const client_1 = require("@prisma/client");
const cart_repository_1 = require("./cart.repository");
let CartService = class CartService {
    cartRepository;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async getCarts(userId, query) {
        try {
            return await this.cartRepository.list({
                languageId: '',
                userId,
                limit: query.limit,
                page: query.page,
            });
        }
        catch (error) {
            console.log('/cart', error);
            throw error;
        }
    }
    async create(userId, body) {
        try {
            return await this.cartRepository.create(userId, body);
        }
        catch (error) {
            console.log('/cart', error);
            throw error;
        }
    }
    async update({ id, userId, body, }) {
        try {
            const updatedCart = await this.cartRepository.update({
                id,
                userId,
                body,
            });
            return updatedCart;
        }
        catch (error) {
            console.log('/cart/:id', error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async delete({ id, userId }) {
        try {
            await this.cartRepository.delete({ id, userId });
            return { message: 'Delete brand successfully' };
        }
        catch (error) {
            console.log('/cart/:id', error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_repository_1.CartRepository])
], CartService);
//# sourceMappingURL=cart.service.js.map