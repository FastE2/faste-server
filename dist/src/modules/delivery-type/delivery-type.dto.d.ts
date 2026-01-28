declare const CreateDeliveryTypeBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    code: string;
    isActive: boolean;
    description: string;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    estimatedTime?: string | null | undefined;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    code: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    estimatedTime: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
    countryCode: import("zod").ZodString;
    basePrice: import("zod").ZodNumber;
    pricePerKg: import("zod").ZodNumber;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "name" | "code" | "isActive" | "description" | "basePrice" | "countryCode" | "estimatedTime" | "pricePerKg">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    code: string;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    isActive?: boolean | undefined;
    description?: string | undefined;
    estimatedTime?: string | null | undefined;
}>;
export declare class CreateDeliveryTypeBodyDTO extends CreateDeliveryTypeBodyDTO_base {
}
declare const UpdateDeliveryTypeBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    code: string;
    isActive: boolean;
    description: string;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    estimatedTime?: string | null | undefined;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    code: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    estimatedTime: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
    countryCode: import("zod").ZodString;
    basePrice: import("zod").ZodNumber;
    pricePerKg: import("zod").ZodNumber;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "name" | "code" | "isActive" | "description" | "basePrice" | "countryCode" | "estimatedTime" | "pricePerKg">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    code: string;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    isActive?: boolean | undefined;
    description?: string | undefined;
    estimatedTime?: string | null | undefined;
}>;
export declare class UpdateDeliveryTypeBodyDTO extends UpdateDeliveryTypeBodyDTO_base {
}
declare const GetDeliveryTypeResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    code: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    estimatedTime?: string | null | undefined;
}[], import("zod").ZodArrayDef<import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    code: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    estimatedTime: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
    countryCode: import("zod").ZodString;
    basePrice: import("zod").ZodNumber;
    pricePerKg: import("zod").ZodNumber;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny, {
    id: number;
    name: string;
    code: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    estimatedTime?: string | null | undefined;
}, {
    id: number;
    name: string;
    code: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    description?: string | undefined;
    estimatedTime?: string | null | undefined;
    isActive?: boolean | undefined;
}>>, {
    id: number;
    name: string;
    code: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    description?: string | undefined;
    estimatedTime?: string | null | undefined;
    isActive?: boolean | undefined;
}[]>;
export declare class GetDeliveryTypeResDTO extends GetDeliveryTypeResDTO_base {
}
declare const GetDeliveryTypeByIdResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    code: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    estimatedTime?: string | null | undefined;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    code: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    estimatedTime: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
    countryCode: import("zod").ZodString;
    basePrice: import("zod").ZodNumber;
    pricePerKg: import("zod").ZodNumber;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    code: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    description?: string | undefined;
    estimatedTime?: string | null | undefined;
    isActive?: boolean | undefined;
}>;
export declare class GetDeliveryTypeByIdResDTO extends GetDeliveryTypeByIdResDTO_base {
}
declare const CreateDeliveryTypeResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    code: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    estimatedTime?: string | null | undefined;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    code: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    estimatedTime: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
    countryCode: import("zod").ZodString;
    basePrice: import("zod").ZodNumber;
    pricePerKg: import("zod").ZodNumber;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    code: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    description?: string | undefined;
    estimatedTime?: string | null | undefined;
    isActive?: boolean | undefined;
}>;
export declare class CreateDeliveryTypeResDTO extends CreateDeliveryTypeResDTO_base {
}
declare const UpdateDeliveryTypeResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    code: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    estimatedTime?: string | null | undefined;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    code: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    estimatedTime: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
    countryCode: import("zod").ZodString;
    basePrice: import("zod").ZodNumber;
    pricePerKg: import("zod").ZodNumber;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    code: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    basePrice: number;
    countryCode: string;
    pricePerKg: number;
    description?: string | undefined;
    estimatedTime?: string | null | undefined;
    isActive?: boolean | undefined;
}>;
export declare class UpdateDeliveryTypeResDTO extends UpdateDeliveryTypeResDTO_base {
}
export {};
