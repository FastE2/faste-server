declare const CreateTemplateBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    isActive: boolean;
    categoriesView: number[];
    WidgetIds: number[];
    theme: string | null;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    categoriesView: import("zod").ZodArray<import("zod").ZodNumber, "many">;
    WidgetIds: import("zod").ZodArray<import("zod").ZodNumber, "many">;
    sellerId: import("zod").ZodNumber;
    theme: import("zod").ZodNullable<import("zod").ZodString>;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    createdAt: import("zod").ZodDate;
}, "name" | "isActive" | "categoriesView" | "WidgetIds" | "theme">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    categoriesView: number[];
    WidgetIds: number[];
    theme: string | null;
    isActive?: boolean | undefined;
}>;
export declare class CreateTemplateBodyDTO extends CreateTemplateBodyDTO_base {
}
declare const UpdateTemplateBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    isActive: boolean;
    categoriesView: number[];
    WidgetIds: number[];
    theme: string | null;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    categoriesView: import("zod").ZodArray<import("zod").ZodNumber, "many">;
    WidgetIds: import("zod").ZodArray<import("zod").ZodNumber, "many">;
    sellerId: import("zod").ZodNumber;
    theme: import("zod").ZodNullable<import("zod").ZodString>;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    createdAt: import("zod").ZodDate;
}, "name" | "isActive" | "categoriesView" | "WidgetIds" | "theme">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    categoriesView: number[];
    WidgetIds: number[];
    theme: string | null;
    isActive?: boolean | undefined;
}>;
export declare class UpdateTemplateBodyDTO extends UpdateTemplateBodyDTO_base {
}
export {};
