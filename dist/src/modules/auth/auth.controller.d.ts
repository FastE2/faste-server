import { ForgotPasswordBodyDTO, LoginBodyDTO, RegisterBodyDTO, SendOTPBodyDTO, TwoFADisableBodyDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { EmptyBodyDTO } from 'src/common/dtos/request.dto';
import { GoogleService } from './google.service';
export declare class AuthController {
    private readonly authService;
    private readonly googleService;
    constructor(authService: AuthService, googleService: GoogleService);
    register(body: RegisterBodyDTO): Promise<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        dateOfBirth: Date | null;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(body: LoginBodyDTO, userAgent: string, ip: string, res: Response): Promise<{
        accessToken: string;
    }>;
    refreshToken(_: EmptyBodyDTO, req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(_: EmptyBodyDTO, req: Request, res: Response): Promise<{
        message: string;
    }>;
    sendOTP(body: SendOTPBodyDTO): Promise<{
        message: string;
    }>;
    forgotPassowrd(body: ForgotPasswordBodyDTO): Promise<{
        message: string;
    }>;
    enableTwoFactorAuth(_: EmptyBodyDTO, userId: number): Promise<{
        uri: string;
    }>;
    disableTwoFactorAuth(body: TwoFADisableBodyDTO, userId: number): Promise<{
        message: string;
    }>;
    googleAuth(ip: string, userAgent: string): {
        url: string;
    };
    googleAuthCallback(code: string, state: string, res: Response): Promise<void>;
}
