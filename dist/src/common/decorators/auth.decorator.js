"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ispublic = void 0;
const common_1 = require("@nestjs/common");
const auth_constant_1 = require("../constants/auth.constant");
const Ispublic = () => (0, common_1.SetMetadata)(auth_constant_1.AUTH_NOT_REQUIRED, true);
exports.Ispublic = Ispublic;
//# sourceMappingURL=auth.decorator.js.map