"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const generate_1 = require("../helpers/generate");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redis_1 = require("redis");
const token_service_1 = require("../libs/token/token.service");
const validate_env_1 = __importDefault(require("../configs/validate-env"));
class WebsocketAdapter extends platform_socket_io_1.IoAdapter {
    tokenService;
    adapterConstructor;
    constructor(app) {
        super(app);
        this.tokenService = app.get(token_service_1.TokenService);
    }
    async connectToRedis() {
        const pubClient = (0, redis_1.createClient)({ url: validate_env_1.default.REDIS_URL });
        const subClient = pubClient.duplicate();
        await Promise.all([pubClient.connect(), subClient.connect()]);
        this.adapterConstructor = (0, redis_adapter_1.createAdapter)(pubClient, subClient);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, {
            ...options,
            cors: {
                origin: '*',
                credentials: true,
            },
        });
        if (this.adapterConstructor) {
            server.adapter(this.adapterConstructor);
        }
        this.registerAuthMiddleware(server);
        return server;
    }
    registerAuthMiddleware(server) {
        server.of(/.*/).use((socket, next) => {
            this.wsAuthMiddleware(socket, next).catch(next);
        });
    }
    async wsAuthMiddleware(socket, next) {
        const { authorization } = socket.handshake.headers;
        if (!authorization) {
            return next(new Error('Missing Authorization header'));
        }
        const accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            return next(new Error('Invalid Authorization format'));
        }
        try {
            const { userId } = await this.tokenService.verifyAccessToken(accessToken);
            socket.data.userId = userId;
            await socket.join((0, generate_1.generateRoomUserId)(userId));
            next();
        }
        catch (error) {
            next(new Error('Unauthorized'));
        }
    }
}
exports.WebsocketAdapter = WebsocketAdapter;
//# sourceMappingURL=websocket.adapter.js.map