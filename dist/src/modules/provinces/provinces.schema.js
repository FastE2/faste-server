"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProvincesSchema = exports.GetParamsProvincesSchema = void 0;
const zod_1 = require("zod");
exports.GetParamsProvincesSchema = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    countryCode: zod_1.z.coerce.string(),
});
exports.QueryProvincesSchema = zod_1.z.object({
    parentId: zod_1.z.coerce.number().int().positive().optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().default(10),
});
//# sourceMappingURL=provinces.schema.js.map