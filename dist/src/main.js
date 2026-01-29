"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const websocket_adapter_1 = require("./common/websockets/websocket.adapter");
const swagger_1 = require("@nestjs/swagger");
const nestjs_zod_1 = require("nestjs-zod");
const helmet_1 = __importDefault(require("helmet"));
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: process.env.CORS_ORIGINS?.split(','),
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    });
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    }));
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    (0, nestjs_zod_1.patchNestJsSwagger)();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('FastE API')
        .setDescription('The API for the ecommerce application')
        .setVersion('1.0')
        .addBearerAuth()
        .addApiKey({
        name: 'authorization',
        type: 'apiKey',
    }, 'payment-api-key')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, documentFactory, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const websocketAdapter = new websocket_adapter_1.WebsocketAdapter(app);
    await websocketAdapter.connectToRedis();
    app.useWebSocketAdapter(websocketAdapter);
    const port = process.env.PORT || 8080;
    await app.listen(port);
    console.log(`
  ╔═══════════════════════════════════════════╗
  ║ FastE API Server is running!              ║
  ║                                           ║
  ║ URL: http://localhost:${port}                ║
  ║ Docs: http://localhost:${port}/api/docs      ║
  ╚═══════════════════════════════════════════╝
  © Copyright belongs to the account [ahkiet lekiett2201@gmail.com]. Unauthorized copying, selling, distribution, or modification is prohibited.

  `);
}
void bootstrap();
//# sourceMappingURL=main.js.map