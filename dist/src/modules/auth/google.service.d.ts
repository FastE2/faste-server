import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthStateType } from './auth.schema';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
import { AuthRepository } from './auth.repository';
import { HashService } from 'src/common/libs/crypto/hash.service';
import { TokenService } from 'src/common/libs/token/token.service';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
export declare class GoogleService {
    private readonly authRepository;
    private readonly commonRoleRepository;
    private readonly commonUserRepository;
    private readonly hashService;
    private readonly tokenService;
    constructor(authRepository: AuthRepository, commonRoleRepository: CommonRoleRepository, commonUserRepository: CommonUserRepository, hashService: HashService, tokenService: TokenService);
    getOAuth2ClientUrl(data: GoogleAuthStateType): {
        url: string;
    };
    getAuthClient(): OAuth2Client;
    getAuthUrl({ ip, userAgent }: GoogleAuthStateType, authClient: OAuth2Client): {
        url: string;
    };
    googleCallback({ code, state }: {
        code: string;
        state: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
