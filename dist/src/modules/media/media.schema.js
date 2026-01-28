"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresignedUploadFileBodySchema = exports.FileSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.FileSchema = zod_1.z.object({
    key: zod_1.z.string(),
    type: zod_1.z.nativeEnum(client_1.FileType),
    size: zod_1.z.number(),
    url: zod_1.z.string(),
    isPublic: zod_1.z.boolean(),
    createdAt: zod_1.z.date().default(new Date()),
    createdById: zod_1.z.number(),
});
exports.PresignedUploadFileBodySchema = zod_1.z
    .object({
    filename: zod_1.z.string(),
    filesize: zod_1.z.number().max(1 * 1024 * 1024),
})
    .strict();
//# sourceMappingURL=media.schema.js.map