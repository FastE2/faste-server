"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBodySchema = exports.GetParamsSchema = exports.PaginationQuerySchema = exports.EmptyBodySchema = void 0;
const zod_1 = require("zod");
exports.EmptyBodySchema = zod_1.z.object({}).strict();
exports.PaginationQuerySchema = zod_1.z
    .object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().default(10),
    role: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
})
    .strict();
exports.GetParamsSchema = zod_1.z.object({
    id: zod_1.z.coerce.number(),
});
exports.DeleteBodySchema = zod_1.z
    .object({
    isHard: zod_1.z.boolean().optional(),
})
    .strict();
//# sourceMappingURL=request.schema.js.map