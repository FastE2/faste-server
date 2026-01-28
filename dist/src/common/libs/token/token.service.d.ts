import { JwtService } from '@nestjs/jwt';
export interface PayloadAccessTokenTypeCreate {
    userId: number;
    roleId: number;
}
export interface PayloadRefreshTokenTypeCreate {
    userId: number;
}
export declare class TokenService {
    private jwtService;
    constructor(jwtService: JwtService);
    signAccessToken(payload: PayloadAccessTokenTypeCreate): Promise<string>;
    signRefreshToken(payload: PayloadRefreshTokenTypeCreate): Promise<string>;
    verifyAccessToken(token: string): Promise<{
        userId: number;
        roleId: number;
        exp: number;
        iat: number;
    }>;
    verifyRefreshToken(token: string): Promise<{
        userId: number;
        exp: number;
    }>;
}
