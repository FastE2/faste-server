import { z } from 'zod';
export declare const MessageResSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
export type MessageResType = z.infer<typeof MessageResSchema>;
