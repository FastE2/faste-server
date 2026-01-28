"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.RoleSchema = zod_1.default.object({
    id: zod_1.default.number(),
    name: zod_1.default.string().min(1).max(300),
    isActive: zod_1.default.boolean().default(true),
    description: zod_1.default.string(),
    createdById: zod_1.default.number().nullable(),
    updatedById: zod_1.default.number().nullable(),
    deletedById: zod_1.default.number().nullable(),
    deletedAt: zod_1.default.date().nullable(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
});
//# sourceMappingURL=role.schema.js.map