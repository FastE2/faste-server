"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const validate_env_1 = __importDefault(require("../../common/configs/validate-env"));
const common_role_repository_1 = require("../../common/repositories/common-role.repository");
const uuid_1 = require("uuid");
const auth_error_1 = require("./auth.error");
const auth_repository_1 = require("./auth.repository");
const hash_service_1 = require("../../common/libs/crypto/hash.service");
const token_service_1 = require("../../common/libs/token/token.service");
const common_user_repository_1 = require("../../common/repositories/common-user.repository");
let GoogleService = class GoogleService {
    authRepository;
    commonRoleRepository;
    commonUserRepository;
    hashService;
    tokenService;
    constructor(authRepository, commonRoleRepository, commonUserRepository, hashService, tokenService) {
        this.authRepository = authRepository;
        this.commonRoleRepository = commonRoleRepository;
        this.commonUserRepository = commonUserRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
    }
    getOAuth2ClientUrl(data) {
        const authClient = this.getAuthClient();
        return this.getAuthUrl(data, authClient);
    }
    getAuthClient() {
        const authClient = new google_auth_library_1.OAuth2Client(validate_env_1.default.GOOGLE_CLIENT_ID, validate_env_1.default.GOOGLE_CLIENT_SECRET, validate_env_1.default.GOOGLE_REDIRECT_URI);
        return authClient;
    }
    getAuthUrl({ ip, userAgent }, authClient) {
        const scope = validate_env_1.default.GOOGLE_SCOPES_API.split(',');
        const state = Buffer.from(JSON.stringify({
            userAgent,
            ip,
        })).toString('base64');
        const authorizeUrl = authClient.generateAuthUrl({
            access_type: 'offline',
            scope,
            include_granted_scopes: true,
            state,
        });
        return { url: authorizeUrl };
    }
    async googleCallback({ code, state }) {
        const authClient = this.getAuthClient();
        try {
            let userAgent = 'Unknow';
            let ip = 'Unknow';
            try {
                if (state) {
                    const clientInfo = JSON.parse(Buffer.from(state, 'base64').toString());
                    userAgent = clientInfo.userAgent;
                    ip = clientInfo.ip;
                }
            }
            catch (error) {
                console.error(error);
            }
            const { tokens } = await authClient.getToken(code);
            authClient.setCredentials(tokens);
            const oauth2 = googleapis_1.google.oauth2({ version: 'v2', auth: authClient });
            const { data } = await oauth2.userinfo.get();
            if (!data.email) {
                throw auth_error_1.GoogleUserInfoError;
            }
            let user = await this.commonUserRepository.findUniqueUser({
                email: data.email,
            });
            if (!user) {
                const clientRoleId = await this.commonRoleRepository.getClientRoleId();
                const randomPassword = (0, uuid_1.v4)();
                const hashPassword = await this.hashService.hash(randomPassword);
                user = await this.authRepository.createUserIncludeRole({
                    email: data.email ?? '',
                    name: data.name ?? '',
                    password: hashPassword,
                    roleId: clientRoleId,
                    phoneNumber: '',
                    avatar: data.picture ?? null,
                });
            }
            const deviceUser = await this.authRepository.updateOrCreateDeviceUser({
                userId: user.id,
                userAgent,
                ip,
            });
            const [accessToken, refreshToken] = await Promise.all([
                this.tokenService.signAccessToken({
                    userId: user.id,
                    roleId: user.roleId,
                }),
                this.tokenService.signRefreshToken({ userId: user.id }),
            ]);
            const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken);
            await this.authRepository.createRefreshToken({
                token: refreshToken,
                deviceId: deviceUser.id,
                userId: user.id,
                expiresAt: new Date(decodedRefreshToken.exp * 1000),
            });
            return { accessToken, refreshToken };
        }
        catch (error) {
            console.error('/auth/google/callback', error);
            throw error;
        }
    }
};
exports.GoogleService = GoogleService;
exports.GoogleService = GoogleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        common_role_repository_1.CommonRoleRepository,
        common_user_repository_1.CommonUserRepository,
        hash_service_1.HashService,
        token_service_1.TokenService])
], GoogleService);
//# sourceMappingURL=google.service.js.map