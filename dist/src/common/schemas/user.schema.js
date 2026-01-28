"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_constant_1 = require("../constants/user.constant");
exports.UserSchema = zod_1.default.object({
    id: zod_1.default.number(),
    email: zod_1.default.string().email(),
    name: zod_1.default.string().min(1).max(100),
    password: zod_1.default.string().min(6).max(100),
    phoneNumber: zod_1.default.string().min(9).max(15),
    avatar: zod_1.default.string().nullable(),
    gender: zod_1.default.nativeEnum(user_constant_1.GENDER).nullable(),
    roleId: zod_1.default.number().positive(),
    totpSecret: zod_1.default.string().nullable(),
    dateOfBirth: zod_1.default.preprocess((val) => {
        if (typeof val === 'string' || val instanceof Date) {
            return new Date(val);
        }
        return val;
    }, zod_1.default.date().nullable()),
    createdById: zod_1.default.number().nullable(),
    updatedById: zod_1.default.number().nullable(),
    deletedById: zod_1.default.number().nullable(),
    deletedAt: zod_1.default.date().nullable(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
});
//# sourceMappingURL=user.schema.js.map