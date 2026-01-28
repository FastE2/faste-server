"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const zod_1 = __importDefault(require("zod"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({
    path: '.env',
});
if (!fs_1.default.existsSync(path_1.default.resolve('.env'))) {
    console.log('File env not exist');
    process.exit(1);
}
const configSchema = zod_1.default.object({
    DATABASE_URL: zod_1.default.string(),
    EXPIRES_IN_ACCESSTOKEN: zod_1.default.string(),
    EXPIRES_IN_REFRESHTOKEN: zod_1.default.string(),
    SERECT_KEY_ACCESSTOKEN: zod_1.default.string(),
    SERECT_KEY_REFRESHTOKEN: zod_1.default.string(),
    MAIL_USER: zod_1.default.string(),
    MAIL_PASS: zod_1.default.string(),
    OTP_EXPIRES_IN: zod_1.default.string(),
    APP_NAME: zod_1.default.string(),
    ENCRYPTION_KEY: zod_1.default.string(),
    GOOGLE_SCOPES_API: zod_1.default.string(),
    GOOGLE_CLIENT_ID: zod_1.default.string(),
    GOOGLE_CLIENT_SECRET: zod_1.default.string(),
    GOOGLE_REDIRECT_URI: zod_1.default.string(),
    GOOGLE_CLIENT_REDIRECT_URI: zod_1.default.string(),
    AWS_S3_PUBLIC_BUCKET: zod_1.default.string(),
    AWS_S3_REGION: zod_1.default.string(),
    AWS_S3_ACCESS_KEY_ID: zod_1.default.string(),
    AWS_S3_SECRET_ACCESS_KEY: zod_1.default.string(),
    PAYMENT_API_KEY: zod_1.default.string(),
    REDIS_URL: zod_1.default.string(),
    AMQP_URL: zod_1.default.string(),
    ELASTICSEARCH_NODE: zod_1.default.string(),
    ELASTICSEARCH_APIKEY: zod_1.default.string(),
});
const configServer = configSchema.safeParse(process.env);
if (!configServer.success) {
    console.log('The declared values in the .evn file are invalid.');
    console.log(configServer.error);
    process.exit(1);
}
const envConfig = configServer.data;
exports.default = envConfig;
//# sourceMappingURL=validate-env.js.map