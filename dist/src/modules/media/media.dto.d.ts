declare const PresignedUploadFileBodyDTO_base: import("nestjs-zod").ZodDto<{
    filename: string;
    filesize: number;
}, import("zod").ZodObjectDef<{
    filename: import("zod").ZodString;
    filesize: import("zod").ZodNumber;
}, "strict", import("zod").ZodTypeAny>, {
    filename: string;
    filesize: number;
}>;
export declare class PresignedUploadFileBodyDTO extends PresignedUploadFileBodyDTO_base {
}
declare const GetMediasQueryDTO_base: import("nestjs-zod").ZodDto<{
    page: number;
    limit: number;
    role?: string | undefined;
    status?: string | undefined;
}, import("zod").ZodObjectDef<{
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    role: import("zod").ZodOptional<import("zod").ZodString>;
    status: import("zod").ZodOptional<import("zod").ZodString>;
}, "strict", import("zod").ZodTypeAny>, {
    page?: number | undefined;
    limit?: number | undefined;
    role?: string | undefined;
    status?: string | undefined;
}>;
export declare class GetMediasQueryDTO extends GetMediasQueryDTO_base {
}
export {};
