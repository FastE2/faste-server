import { config } from 'dotenv';
import z from 'zod';
import  fs from 'fs';
import  path from 'path';

config({
  path: '.env',
});

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('File env not exist');
  process.exit(1);
}

const configSchema = z.object({
  DATABASE_URL: z.string(),
  EXPIRES_IN_ACCESSTOKEN: z.string(),
  EXPIRES_IN_REFRESHTOKEN: z.string(),
  SERECT_KEY_ACCESSTOKEN: z.string(),
  SERECT_KEY_REFRESHTOKEN: z.string(),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  OTP_EXPIRES_IN: z.string()
});

const configServer = configSchema.safeParse(process.env);

if (!configServer.success) {
  console.log('The declared values in the .evn file are invalid.');
  console.log(configServer.error);
  process.exit(1);
}

const envConfig = configServer.data;

export default envConfig;
