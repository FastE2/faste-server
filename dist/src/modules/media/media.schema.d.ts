import { z } from 'zod';
export declare const FileSchema: z.ZodObject<{
    key: z.ZodString;
    type: z.ZodNativeEnum<{
        IMAGE: "IMAGE";
        VIDEO: "VIDEO";
    }>;
    size: z.ZodNumber;
    url: z.ZodString;
    isPublic: z.ZodBoolean;
    createdAt: z.ZodDefault<z.ZodDate>;
    createdById: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "IMAGE" | "VIDEO";
    createdById: number;
    createdAt: Date;
    url: string;
    key: string;
    size: number;
    isPublic: boolean;
}, {
    type: "IMAGE" | "VIDEO";
    createdById: number;
    url: string;
    key: string;
    size: number;
    isPublic: boolean;
    createdAt?: Date | undefined;
}>;
export declare const PresignedUploadFileBodySchema: z.ZodObject<{
    filename: z.ZodString;
    filesize: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    filename: string;
    filesize: number;
}, {
    filename: string;
    filesize: number;
}>;
export type PresignedUploadFileBodyType = z.infer<typeof PresignedUploadFileBodySchema>;
export type FileMediaType = z.infer<typeof FileSchema>;
