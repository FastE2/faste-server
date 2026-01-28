import { z } from 'zod';
export declare const TemplateSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    categoriesView: z.ZodArray<z.ZodNumber, "many">;
    WidgetIds: z.ZodArray<z.ZodNumber, "many">;
    sellerId: z.ZodNumber;
    theme: z.ZodNullable<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    createdAt: Date;
    isActive: boolean;
    categoriesView: number[];
    WidgetIds: number[];
    sellerId: number;
    theme: string | null;
}, {
    id: number;
    name: string;
    createdAt: Date;
    categoriesView: number[];
    WidgetIds: number[];
    sellerId: number;
    theme: string | null;
    isActive?: boolean | undefined;
}>;
export declare const CreateTemplateBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    name: z.ZodString;
    categoriesView: z.ZodArray<z.ZodNumber, "many">;
    WidgetIds: z.ZodArray<z.ZodNumber, "many">;
    sellerId: z.ZodNumber;
    theme: z.ZodNullable<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
}, "name" | "isActive" | "categoriesView" | "WidgetIds" | "theme">, "strict", z.ZodTypeAny, {
    name: string;
    isActive: boolean;
    categoriesView: number[];
    WidgetIds: number[];
    theme: string | null;
}, {
    name: string;
    categoriesView: number[];
    WidgetIds: number[];
    theme: string | null;
    isActive?: boolean | undefined;
}>;
export declare const UpdateTemplateBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    name: z.ZodString;
    categoriesView: z.ZodArray<z.ZodNumber, "many">;
    WidgetIds: z.ZodArray<z.ZodNumber, "many">;
    sellerId: z.ZodNumber;
    theme: z.ZodNullable<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
}, "name" | "isActive" | "categoriesView" | "WidgetIds" | "theme">, "strict", z.ZodTypeAny, {
    name: string;
    isActive: boolean;
    categoriesView: number[];
    WidgetIds: number[];
    theme: string | null;
}, {
    name: string;
    categoriesView: number[];
    WidgetIds: number[];
    theme: string | null;
    isActive?: boolean | undefined;
}>;
export type CreateTemplateBodyType = z.infer<typeof CreateTemplateBodySchema>;
export type UpdateTemplateBodyType = z.infer<typeof UpdateTemplateBodySchema>;
