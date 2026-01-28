declare const MessageResDTO_base: import("nestjs-zod").ZodDto<{
    message: string;
}, import("zod").ZodObjectDef<{
    message: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    message: string;
}>;
export declare class MessageResDTO extends MessageResDTO_base {
}
export {};
