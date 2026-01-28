"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrismaRecordNotFound = isPrismaRecordNotFound;
const client_1 = require("@prisma/client");
function isPrismaRecordNotFound(error) {
    return (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025');
}
//# sourceMappingURL=prisma.js.map