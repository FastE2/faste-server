declare const UpdateShopBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    description: string;
    addressShipId: number;
    logo: string;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    deliveryTypeIds: number[];
    cover?: string | null | undefined;
    banner?: string | null | undefined;
}, import("zod").ZodObjectDef<{
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    addressShipId: import("zod").ZodNumber;
    logo: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    cover: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    banner: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    businessType: import("zod").ZodNativeEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        BUSINESS_HOUSEHOLD: "BUSINESS_HOUSEHOLD";
        COMPANY: "COMPANY";
    }>;
    taxCode: import("zod").ZodString;
    paymentMethods: import("zod").ZodArray<import("zod").ZodNativeEnum<{
        COD: "COD";
        SEPAY: "SEPAY";
        WEB3: "WEB3";
    }>, "many">;
    deliveryTypeIds: import("zod").ZodArray<import("zod").ZodNumber, "many">;
}, "strip", import("zod").ZodTypeAny>, {
    name: string;
    addressShipId: number;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    deliveryTypeIds: number[];
    description?: string | undefined;
    logo?: string | undefined;
    cover?: string | null | undefined;
    banner?: string | null | undefined;
}>;
export declare class UpdateShopBodyDTO extends UpdateShopBodyDTO_base {
}
declare const GetShopResDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    addressShipId: number;
    shopid: number;
    slug: string;
    logo: string;
    ratingStar: number;
    responseRate: number;
    responseTime: number;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    itemCount: number | null;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    cover?: string | null | undefined;
    banner?: string | null | undefined;
    followerCount?: number | null | undefined;
    deletedAt?: Date | null | undefined;
    deletedById?: number | null | undefined;
}[], import("zod").ZodArrayDef<import("zod").ZodObject<{
    shopid: import("zod").ZodNumber;
    name: import("zod").ZodString;
    slug: import("zod").ZodString;
    logo: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    cover: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    banner: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    followerCount: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    ratingStar: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    responseRate: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    responseTime: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    addressShipId: import("zod").ZodNumber;
    businessType: import("zod").ZodNativeEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        BUSINESS_HOUSEHOLD: "BUSINESS_HOUSEHOLD";
        COMPANY: "COMPANY";
    }>;
    taxCode: import("zod").ZodString;
    status: import("zod").ZodNativeEnum<{
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    itemCount: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>>;
    paymentMethods: import("zod").ZodArray<import("zod").ZodNativeEnum<{
        COD: "COD";
        SEPAY: "SEPAY";
        WEB3: "WEB3";
    }>, "many">;
    createdAt: import("zod").ZodDefault<import("zod").ZodDate>;
    updatedAt: import("zod").ZodDefault<import("zod").ZodDate>;
    deletedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    deletedById: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny, {
    name: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    addressShipId: number;
    shopid: number;
    slug: string;
    logo: string;
    ratingStar: number;
    responseRate: number;
    responseTime: number;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    itemCount: number | null;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    cover?: string | null | undefined;
    banner?: string | null | undefined;
    followerCount?: number | null | undefined;
    deletedAt?: Date | null | undefined;
    deletedById?: number | null | undefined;
}, {
    name: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    addressShipId: number;
    shopid: number;
    slug: string;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    logo?: string | undefined;
    cover?: string | null | undefined;
    banner?: string | null | undefined;
    description?: string | undefined;
    followerCount?: number | null | undefined;
    ratingStar?: number | undefined;
    responseRate?: number | undefined;
    responseTime?: number | undefined;
    isActive?: boolean | undefined;
    itemCount?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    deletedAt?: Date | null | undefined;
    deletedById?: number | null | undefined;
}>>, {
    name: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    addressShipId: number;
    shopid: number;
    slug: string;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    logo?: string | undefined;
    cover?: string | null | undefined;
    banner?: string | null | undefined;
    description?: string | undefined;
    followerCount?: number | null | undefined;
    ratingStar?: number | undefined;
    responseRate?: number | undefined;
    responseTime?: number | undefined;
    isActive?: boolean | undefined;
    itemCount?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    deletedAt?: Date | null | undefined;
    deletedById?: number | null | undefined;
}[]>;
export declare class GetShopResDTO extends GetShopResDTO_base {
}
declare const GetShopByIdResDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    addressShipId: number;
    shopid: number;
    slug: string;
    logo: string;
    ratingStar: number;
    responseRate: number;
    responseTime: number;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    itemCount: number | null;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    cover?: string | null | undefined;
    banner?: string | null | undefined;
    followerCount?: number | null | undefined;
    deletedAt?: Date | null | undefined;
    deletedById?: number | null | undefined;
}, import("zod").ZodObjectDef<{
    shopid: import("zod").ZodNumber;
    name: import("zod").ZodString;
    slug: import("zod").ZodString;
    logo: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    cover: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    banner: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    followerCount: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    ratingStar: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    responseRate: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    responseTime: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    addressShipId: import("zod").ZodNumber;
    businessType: import("zod").ZodNativeEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        BUSINESS_HOUSEHOLD: "BUSINESS_HOUSEHOLD";
        COMPANY: "COMPANY";
    }>;
    taxCode: import("zod").ZodString;
    status: import("zod").ZodNativeEnum<{
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    itemCount: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>>;
    paymentMethods: import("zod").ZodArray<import("zod").ZodNativeEnum<{
        COD: "COD";
        SEPAY: "SEPAY";
        WEB3: "WEB3";
    }>, "many">;
    createdAt: import("zod").ZodDefault<import("zod").ZodDate>;
    updatedAt: import("zod").ZodDefault<import("zod").ZodDate>;
    deletedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    deletedById: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny>, {
    name: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    addressShipId: number;
    shopid: number;
    slug: string;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    logo?: string | undefined;
    cover?: string | null | undefined;
    banner?: string | null | undefined;
    description?: string | undefined;
    followerCount?: number | null | undefined;
    ratingStar?: number | undefined;
    responseRate?: number | undefined;
    responseTime?: number | undefined;
    isActive?: boolean | undefined;
    itemCount?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    deletedAt?: Date | null | undefined;
    deletedById?: number | null | undefined;
}>;
export declare class GetShopByIdResDTO extends GetShopByIdResDTO_base {
}
declare const CreateShopResDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    addressShipId: number;
    shopid: number;
    slug: string;
    logo: string;
    ratingStar: number;
    responseRate: number;
    responseTime: number;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    itemCount: number | null;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    cover?: string | null | undefined;
    banner?: string | null | undefined;
    followerCount?: number | null | undefined;
    deletedAt?: Date | null | undefined;
    deletedById?: number | null | undefined;
}, import("zod").ZodObjectDef<{
    shopid: import("zod").ZodNumber;
    name: import("zod").ZodString;
    slug: import("zod").ZodString;
    logo: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    cover: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    banner: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    followerCount: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    ratingStar: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    responseRate: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    responseTime: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    addressShipId: import("zod").ZodNumber;
    businessType: import("zod").ZodNativeEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        BUSINESS_HOUSEHOLD: "BUSINESS_HOUSEHOLD";
        COMPANY: "COMPANY";
    }>;
    taxCode: import("zod").ZodString;
    status: import("zod").ZodNativeEnum<{
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    itemCount: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>>;
    paymentMethods: import("zod").ZodArray<import("zod").ZodNativeEnum<{
        COD: "COD";
        SEPAY: "SEPAY";
        WEB3: "WEB3";
    }>, "many">;
    createdAt: import("zod").ZodDefault<import("zod").ZodDate>;
    updatedAt: import("zod").ZodDefault<import("zod").ZodDate>;
    deletedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    deletedById: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny>, {
    name: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    addressShipId: number;
    shopid: number;
    slug: string;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    logo?: string | undefined;
    cover?: string | null | undefined;
    banner?: string | null | undefined;
    description?: string | undefined;
    followerCount?: number | null | undefined;
    ratingStar?: number | undefined;
    responseRate?: number | undefined;
    responseTime?: number | undefined;
    isActive?: boolean | undefined;
    itemCount?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    deletedAt?: Date | null | undefined;
    deletedById?: number | null | undefined;
}>;
export declare class CreateShopResDTO extends CreateShopResDTO_base {
}
declare const UpdateShopResDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    addressShipId: number;
    shopid: number;
    slug: string;
    logo: string;
    ratingStar: number;
    responseRate: number;
    responseTime: number;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    itemCount: number | null;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    cover?: string | null | undefined;
    banner?: string | null | undefined;
    followerCount?: number | null | undefined;
    deletedAt?: Date | null | undefined;
    deletedById?: number | null | undefined;
}, import("zod").ZodObjectDef<{
    shopid: import("zod").ZodNumber;
    name: import("zod").ZodString;
    slug: import("zod").ZodString;
    logo: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    cover: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    banner: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    followerCount: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    ratingStar: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    responseRate: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    responseTime: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    addressShipId: import("zod").ZodNumber;
    businessType: import("zod").ZodNativeEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        BUSINESS_HOUSEHOLD: "BUSINESS_HOUSEHOLD";
        COMPANY: "COMPANY";
    }>;
    taxCode: import("zod").ZodString;
    status: import("zod").ZodNativeEnum<{
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    itemCount: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>>;
    paymentMethods: import("zod").ZodArray<import("zod").ZodNativeEnum<{
        COD: "COD";
        SEPAY: "SEPAY";
        WEB3: "WEB3";
    }>, "many">;
    createdAt: import("zod").ZodDefault<import("zod").ZodDate>;
    updatedAt: import("zod").ZodDefault<import("zod").ZodDate>;
    deletedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    deletedById: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny>, {
    name: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    addressShipId: number;
    shopid: number;
    slug: string;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    logo?: string | undefined;
    cover?: string | null | undefined;
    banner?: string | null | undefined;
    description?: string | undefined;
    followerCount?: number | null | undefined;
    ratingStar?: number | undefined;
    responseRate?: number | undefined;
    responseTime?: number | undefined;
    isActive?: boolean | undefined;
    itemCount?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    deletedAt?: Date | null | undefined;
    deletedById?: number | null | undefined;
}>;
export declare class UpdateShopResDTO extends UpdateShopResDTO_base {
}
declare const RegisterShopBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    description: string;
    addressShipId: number;
    slug: string;
    logo: string;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    deliveryTypeIds: number[];
}, import("zod").ZodObjectDef<{
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    addressShipId: import("zod").ZodNumber;
    slug: import("zod").ZodString;
    logo: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    businessType: import("zod").ZodNativeEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        BUSINESS_HOUSEHOLD: "BUSINESS_HOUSEHOLD";
        COMPANY: "COMPANY";
    }>;
    taxCode: import("zod").ZodString;
    paymentMethods: import("zod").ZodArray<import("zod").ZodNativeEnum<{
        COD: "COD";
        SEPAY: "SEPAY";
        WEB3: "WEB3";
    }>, "many">;
    deliveryTypeIds: import("zod").ZodArray<import("zod").ZodNumber, "many">;
}, "strip", import("zod").ZodTypeAny>, {
    name: string;
    addressShipId: number;
    slug: string;
    businessType: "INDIVIDUAL" | "BUSINESS_HOUSEHOLD" | "COMPANY";
    taxCode: string;
    paymentMethods: ("COD" | "SEPAY" | "WEB3")[];
    deliveryTypeIds: number[];
    description?: string | undefined;
    logo?: string | undefined;
}>;
export declare class RegisterShopBodyDTO extends RegisterShopBodyDTO_base {
}
declare const GetParamSlugDTO_base: import("nestjs-zod").ZodDto<{
    slug: string;
}, import("zod").ZodObjectDef<{
    slug: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    slug: string;
}>;
export declare class GetParamSlugDTO extends GetParamSlugDTO_base {
}
export {};
