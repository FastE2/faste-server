"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const common_user_repository_1 = require("./repositories/common-user.repository");
const common_role_repository_1 = require("./repositories/common-role.repository");
const auth_guard_1 = require("./guards/auth.guard");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const token_service_1 = require("./libs/token/token.service");
const hash_service_1 = require("./libs/crypto/hash.service");
const mail_module_1 = require("./libs/mail/mail.module");
const encryption_service_1 = require("./libs/crypto/encryption.service");
const websocket_module_1 = require("./websockets/websocket.module");
const common_sku_repository_1 = require("./repositories/common-sku.repository");
const common_order_repository_1 = require("./repositories/common-order.repository");
const common_product_repository_1 = require("./repositories/common-product.repository");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule, mail_module_1.MailModule],
        providers: [
            common_user_repository_1.CommonUserRepository,
            common_role_repository_1.CommonRoleRepository,
            common_sku_repository_1.CommonSKURepository,
            common_order_repository_1.CommonOrderRepository,
            common_product_repository_1.CommonProductRepository,
            core_1.Reflector,
            token_service_1.TokenService,
            encryption_service_1.EncryptionService,
            hash_service_1.HashService,
            websocket_module_1.WebsocketModule,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
        exports: [
            common_user_repository_1.CommonUserRepository,
            common_role_repository_1.CommonRoleRepository,
            common_order_repository_1.CommonOrderRepository,
            common_sku_repository_1.CommonSKURepository,
            common_product_repository_1.CommonProductRepository,
            token_service_1.TokenService,
            hash_service_1.HashService,
            encryption_service_1.EncryptionService,
            mail_module_1.MailModule,
            websocket_module_1.WebsocketModule,
        ],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map