"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordProfileBodyDTO = exports.UpdateProfileBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const profile_schema_1 = require("./profile.schema");
class UpdateProfileBodyDTO extends (0, nestjs_zod_1.createZodDto)(profile_schema_1.UpdateProfileBodySchema) {
}
exports.UpdateProfileBodyDTO = UpdateProfileBodyDTO;
class ChangePasswordProfileBodyDTO extends (0, nestjs_zod_1.createZodDto)(profile_schema_1.ChangePasswordProfileBodySchema) {
}
exports.ChangePasswordProfileBodyDTO = ChangePasswordProfileBodyDTO;
//# sourceMappingURL=profile.dto.js.map