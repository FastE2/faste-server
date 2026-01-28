declare const WebhookPaymentBodyDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    code: string | null;
    description: string;
    gateway: string;
    transactionDate: string;
    accountNumber: string | null;
    subAccount: string | null;
    accumulated: number;
    content: string | null;
    transferType: "in" | "out";
    transferAmount: number;
    referenceCode: string | null;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    gateway: import("zod").ZodString;
    transactionDate: import("zod").ZodString;
    accountNumber: import("zod").ZodNullable<import("zod").ZodString>;
    code: import("zod").ZodNullable<import("zod").ZodString>;
    content: import("zod").ZodNullable<import("zod").ZodString>;
    transferType: import("zod").ZodEnum<["in", "out"]>;
    transferAmount: import("zod").ZodNumber;
    accumulated: import("zod").ZodNumber;
    subAccount: import("zod").ZodNullable<import("zod").ZodString>;
    referenceCode: import("zod").ZodNullable<import("zod").ZodString>;
    description: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    code: string | null;
    description: string;
    gateway: string;
    transactionDate: string;
    accountNumber: string | null;
    subAccount: string | null;
    accumulated: number;
    content: string | null;
    transferType: "in" | "out";
    transferAmount: number;
    referenceCode: string | null;
}>;
export declare class WebhookPaymentBodyDTO extends WebhookPaymentBodyDTO_base {
}
export {};
