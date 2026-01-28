"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParamsProvincesSchema = void 0;
const zod_1 = require("zod");
exports.GetParamsProvincesSchema = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    countryCode: zod_1.z.coerce.string(),
});
//# sourceMappingURL=provinces.schema.js.map