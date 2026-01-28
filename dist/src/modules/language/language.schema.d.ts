import { z } from 'zod';
export declare const LanguageSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const CreateLanguageBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    name: z.ZodString;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "name">, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const UpdateLanguageBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    name: z.ZodString;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "name">, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export type CreateLanguageBodyType = z.infer<typeof CreateLanguageBodySchema>;
export type UpdateLanguageBodyType = z.infer<typeof UpdateLanguageBodySchema>;
export type LanguageType = z.infer<typeof LanguageSchema>;
