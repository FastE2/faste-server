"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const core_1 = require("@nestjs/core");
const custom_zod_validation_pipe_1 = require("./common/pipes/custom-zod-validation.pipe");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const common_module_1 = require("./common/common.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const user_module_1 = require("./modules/user/user.module");
const role_module_1 = require("./modules/role/role.module");
const permission_module_1 = require("./modules/permission/permission.module");
const language_module_1 = require("./modules/language/language.module");
const profile_module_1 = require("./modules/profile/profile.module");
const brand_module_1 = require("./modules/brand/brand.module");
const category_module_1 = require("./modules/category/category.module");
const product_module_1 = require("./modules/product/product.module");
const cart_module_1 = require("./modules/cart/cart.module");
const order_module_1 = require("./modules/order/order.module");
const provinces_module_1 = require("./modules/provinces/provinces.module");
const delivery_type_module_1 = require("./modules/delivery-type/delivery-type.module");
const address_ship_module_1 = require("./modules/address-ship/address-ship.module");
const shop_module_1 = require("./modules/shop/shop.module");
const queue_module_1 = require("./queues/queue.module");
const payment_module_1 = require("./modules/payment/payment.module");
const flashsale_module_1 = require("./modules/flashsale/flashsale.module");
const template_module_1 = require("./modules/template/template.module");
const widget_module_1 = require("./modules/widget/widget.module");
const search_module_1 = require("./modules/search/search.module");
const review_module_1 = require("./modules/review/review.module");
const throttler_1 = require("@nestjs/throttler");
const health_module_1 = require("./modules/health/health.module");
const modules = [
    auth_module_1.AuthModule,
    user_module_1.UserModule,
    role_module_1.RoleModule,
    permission_module_1.PermissionModule,
    language_module_1.LanguageModule,
    profile_module_1.ProfileModule,
    brand_module_1.BrandModule,
    category_module_1.CategoryModule,
    product_module_1.ProductModule,
    cart_module_1.CartModule,
    order_module_1.OrderModule,
    provinces_module_1.ProvincesModule,
    delivery_type_module_1.DeliveryTypeModule,
    address_ship_module_1.AddressShipModule,
    shop_module_1.ShopModule,
    payment_module_1.PaymentModule,
    flashsale_module_1.FlashsaleModule,
    template_module_1.TemplateModule,
    widget_module_1.WidgetModule,
    search_module_1.SearchModule,
    review_module_1.ReviewModule,
    health_module_1.HealthModule,
];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 60,
                        limit: 100,
                    },
                ],
            }),
            queue_module_1.QueueModule,
            prisma_module_1.PrismaModule,
            common_module_1.CommonModule,
            ...modules,
            health_module_1.HealthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useClass: custom_zod_validation_pipe_1.CustomZodValidationPipe,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map