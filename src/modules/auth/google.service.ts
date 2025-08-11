import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import envConfig from 'src/common/configs/validate-env';
import { GoogleAuthStateType } from './auth.schema';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
import { v4 as uuidv4 } from 'uuid';
import { GoogleUserInfoError } from './auth.error';
import { AuthRepository } from './auth.repository';
import { HashService } from 'src/common/libs/crypto/hash.service';
import { TokenService } from 'src/common/libs/token/token.service';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';

@Injectable()
export class GoogleService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly commonRoleRepository: CommonRoleRepository,
    private readonly commonUserRepository: CommonUserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  getOAuth2ClientUrl(data: GoogleAuthStateType): { url: string } {
    const authClient = this.getAuthClient();
    return this.getAuthUrl(data, authClient);
  }

  getAuthClient(): OAuth2Client {
    const authClient = new OAuth2Client(
      envConfig.GOOGLE_CLIENT_ID,
      envConfig.GOOGLE_CLIENT_SECRET,
      envConfig.GOOGLE_REDIRECT_URI,
    );
    return authClient;
  }

  getAuthUrl(
    { ip, userAgent }: GoogleAuthStateType,
    authClient: OAuth2Client,
  ): { url: string } {
    // Generate the url that will be used for the consent dialog.
    const scope = envConfig.GOOGLE_SCOPES_API.split(',');
    const state = Buffer.from(
      JSON.stringify({
        userAgent,
        ip,
      }),
    ).toString('base64');
    const authorizeUrl = authClient.generateAuthUrl({
      access_type: 'offline',
      scope,
      include_granted_scopes: true,
      state,
    });
    return { url: authorizeUrl };
  }

  async googleCallback({ code, state }: { code: string; state: string }) {
    const authClient = this.getAuthClient();
    try {
      let userAgent = 'Unknow';
      let ip = 'Unknow';
      // 1. Get state to url
      try {
        if (state) {
          const clientInfo = JSON.parse(
            Buffer.from(state, 'base64').toString(),
          ) as GoogleAuthStateType;
          userAgent = clientInfo.userAgent;
          ip = clientInfo.ip;
        }
      } catch (error) {
        console.error(error);
      }

      // 2. use code get token
      const { tokens } = await authClient.getToken(code);
      authClient.setCredentials(tokens);

      // 3. get info google
      const oauth2 = google.oauth2({ version: 'v2', auth: authClient } as any);
      const { data } = await oauth2.userinfo.get();
      if (!data.email) {
        throw GoogleUserInfoError;
      }

      let user = await this.commonUserRepository.findUniqueUser({
        email: data.email,
      });
      if (!user) {
        const clientRoleId = await this.commonRoleRepository.getClientRoleId();
        const randomPassword = uuidv4();
        const hashPassword = await this.hashService.hash(randomPassword);
        user = await this.authRepository.createUserIncludeRole({
          email: data.email ?? '',
          name: data.name ?? '',
          password: hashPassword,
          roleId: clientRoleId!,
          phoneNumber: '',
          avatar: data.picture ?? null,
        });
      }

      const deviceUser = await this.authRepository.updateOrCreateDeviceUser({
        userId: user.id,
        userAgent,
        ip,
      });
      // create accessToken and refreshToken
      const [accessToken, refreshToken] = await Promise.all([
        this.tokenService.signAccessToken({
          userId: user.id,
          roleId: user.roleId,
        }),
        this.tokenService.signRefreshToken({ userId: user.id }),
      ]);

      // verifyRefreshToken
      const decodedRefreshToken =
        await this.tokenService.verifyRefreshToken(refreshToken);

      // Create table RefreshToken
      await this.authRepository.createRefreshToken({
        token: refreshToken,
        deviceId: deviceUser.id,
        userId: user.id,
        expiresAt: new Date(decodedRefreshToken.exp * 1000),
      });

      return { accessToken, refreshToken };
    } catch (error) {
      console.error('/auth/google/callback', error);
      throw error;
    }
  }
}
