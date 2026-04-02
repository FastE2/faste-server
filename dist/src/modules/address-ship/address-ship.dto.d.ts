declare const CreateAddressShipBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    isDeliveryAddress: boolean;
    isDefault: boolean;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    phone: import("zod").ZodString;
    countryId: import("zod").ZodNumber;
    divisionId: import("zod").ZodNumber;
    divisionPath: import("zod").ZodNullable<import("zod").ZodEffects<import("zod").ZodObject<{
        STATE: import("zod").ZodOptional<import("zod").ZodString>;
        CITY: import("zod").ZodOptional<import("zod").ZodString>;
        DISTRICT: import("zod").ZodOptional<import("zod").ZodString>;
        WARD: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>>;
    street: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    houseNumber: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    address: import("zod").ZodString;
    addressInstruction: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    zipcode: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    town: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    labelId: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    isDeliveryAddress: import("zod").ZodDefault<import("zod").ZodBoolean>;
    isDefault: import("zod").ZodDefault<import("zod").ZodBoolean>;
    deletedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    geoinfo: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodObject<{
        region: import("zod").ZodObject<{
            latitude: import("zod").ZodNumber;
            longitude: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: import("zod").ZodOptional<import("zod").ZodBoolean>;
        user_verified: import("zod").ZodOptional<import("zod").ZodBoolean>;
        auto_fill: import("zod").ZodBoolean;
        source: import("zod").ZodOptional<import("zod").ZodString>;
        timestamp: import("zod").ZodOptional<import("zod").ZodString>;
        additionalData: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }>>>;
    latitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    longitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    createdAt: import("zod").ZodDefault<import("zod").ZodDate>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
}, "name" | "countryId" | "latitude" | "longitude" | "phone" | "divisionId" | "divisionPath" | "street" | "houseNumber" | "address" | "addressInstruction" | "zipcode" | "town" | "labelId" | "isDeliveryAddress" | "isDefault" | "geoinfo">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    isDeliveryAddress?: boolean | undefined;
    isDefault?: boolean | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
}>;
export declare class CreateAddressShipBodyDTO extends CreateAddressShipBodyDTO_base {
}
declare const UpdateAddressShipBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    isDeliveryAddress: boolean;
    isDefault: boolean;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    phone: import("zod").ZodString;
    countryId: import("zod").ZodNumber;
    divisionId: import("zod").ZodNumber;
    divisionPath: import("zod").ZodNullable<import("zod").ZodEffects<import("zod").ZodObject<{
        STATE: import("zod").ZodOptional<import("zod").ZodString>;
        CITY: import("zod").ZodOptional<import("zod").ZodString>;
        DISTRICT: import("zod").ZodOptional<import("zod").ZodString>;
        WARD: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>>;
    street: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    houseNumber: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    address: import("zod").ZodString;
    addressInstruction: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    zipcode: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    town: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    labelId: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    isDeliveryAddress: import("zod").ZodDefault<import("zod").ZodBoolean>;
    isDefault: import("zod").ZodDefault<import("zod").ZodBoolean>;
    deletedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    geoinfo: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodObject<{
        region: import("zod").ZodObject<{
            latitude: import("zod").ZodNumber;
            longitude: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: import("zod").ZodOptional<import("zod").ZodBoolean>;
        user_verified: import("zod").ZodOptional<import("zod").ZodBoolean>;
        auto_fill: import("zod").ZodBoolean;
        source: import("zod").ZodOptional<import("zod").ZodString>;
        timestamp: import("zod").ZodOptional<import("zod").ZodString>;
        additionalData: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }>>>;
    latitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    longitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    createdAt: import("zod").ZodDefault<import("zod").ZodDate>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
}, "name" | "countryId" | "latitude" | "longitude" | "phone" | "divisionId" | "divisionPath" | "street" | "houseNumber" | "address" | "addressInstruction" | "zipcode" | "town" | "labelId" | "isDeliveryAddress" | "isDefault" | "geoinfo">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    isDeliveryAddress?: boolean | undefined;
    isDefault?: boolean | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
}>;
export declare class UpdateAddressShipBodyDTO extends UpdateAddressShipBodyDTO_base {
}
declare const GetAddressShipResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdAt: Date;
    userId: number;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    isDeliveryAddress: boolean;
    isDefault: boolean;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    deletedAt?: Date | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    updatedAt?: Date | undefined;
}[], import("zod").ZodArrayDef<import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    phone: import("zod").ZodString;
    countryId: import("zod").ZodNumber;
    divisionId: import("zod").ZodNumber;
    divisionPath: import("zod").ZodNullable<import("zod").ZodEffects<import("zod").ZodObject<{
        STATE: import("zod").ZodOptional<import("zod").ZodString>;
        CITY: import("zod").ZodOptional<import("zod").ZodString>;
        DISTRICT: import("zod").ZodOptional<import("zod").ZodString>;
        WARD: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>>;
    street: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    houseNumber: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    address: import("zod").ZodString;
    addressInstruction: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    zipcode: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    town: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    labelId: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    isDeliveryAddress: import("zod").ZodDefault<import("zod").ZodBoolean>;
    isDefault: import("zod").ZodDefault<import("zod").ZodBoolean>;
    deletedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    geoinfo: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodObject<{
        region: import("zod").ZodObject<{
            latitude: import("zod").ZodNumber;
            longitude: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: import("zod").ZodOptional<import("zod").ZodBoolean>;
        user_verified: import("zod").ZodOptional<import("zod").ZodBoolean>;
        auto_fill: import("zod").ZodBoolean;
        source: import("zod").ZodOptional<import("zod").ZodString>;
        timestamp: import("zod").ZodOptional<import("zod").ZodString>;
        additionalData: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }>>>;
    latitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    longitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    createdAt: import("zod").ZodDefault<import("zod").ZodDate>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
}, "strip", import("zod").ZodTypeAny, {
    id: number;
    name: string;
    createdAt: Date;
    userId: number;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    isDeliveryAddress: boolean;
    isDefault: boolean;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    deletedAt?: Date | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    updatedAt?: Date | undefined;
}, {
    id: number;
    name: string;
    userId: number;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    isDeliveryAddress?: boolean | undefined;
    isDefault?: boolean | undefined;
    deletedAt?: Date | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>>, {
    id: number;
    name: string;
    userId: number;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    isDeliveryAddress?: boolean | undefined;
    isDefault?: boolean | undefined;
    deletedAt?: Date | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}[]>;
export declare class GetAddressShipResDTO extends GetAddressShipResDTO_base {
}
declare const GetAddressShipByIdResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdAt: Date;
    userId: number;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    isDeliveryAddress: boolean;
    isDefault: boolean;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    deletedAt?: Date | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    updatedAt?: Date | undefined;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    phone: import("zod").ZodString;
    countryId: import("zod").ZodNumber;
    divisionId: import("zod").ZodNumber;
    divisionPath: import("zod").ZodNullable<import("zod").ZodEffects<import("zod").ZodObject<{
        STATE: import("zod").ZodOptional<import("zod").ZodString>;
        CITY: import("zod").ZodOptional<import("zod").ZodString>;
        DISTRICT: import("zod").ZodOptional<import("zod").ZodString>;
        WARD: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>>;
    street: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    houseNumber: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    address: import("zod").ZodString;
    addressInstruction: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    zipcode: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    town: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    labelId: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    isDeliveryAddress: import("zod").ZodDefault<import("zod").ZodBoolean>;
    isDefault: import("zod").ZodDefault<import("zod").ZodBoolean>;
    deletedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    geoinfo: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodObject<{
        region: import("zod").ZodObject<{
            latitude: import("zod").ZodNumber;
            longitude: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: import("zod").ZodOptional<import("zod").ZodBoolean>;
        user_verified: import("zod").ZodOptional<import("zod").ZodBoolean>;
        auto_fill: import("zod").ZodBoolean;
        source: import("zod").ZodOptional<import("zod").ZodString>;
        timestamp: import("zod").ZodOptional<import("zod").ZodString>;
        additionalData: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }>>>;
    latitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    longitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    createdAt: import("zod").ZodDefault<import("zod").ZodDate>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    userId: number;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    isDeliveryAddress?: boolean | undefined;
    isDefault?: boolean | undefined;
    deletedAt?: Date | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;
export declare class GetAddressShipByIdResDTO extends GetAddressShipByIdResDTO_base {
}
declare const CreateAddressShipResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdAt: Date;
    userId: number;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    isDeliveryAddress: boolean;
    isDefault: boolean;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    deletedAt?: Date | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    updatedAt?: Date | undefined;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    phone: import("zod").ZodString;
    countryId: import("zod").ZodNumber;
    divisionId: import("zod").ZodNumber;
    divisionPath: import("zod").ZodNullable<import("zod").ZodEffects<import("zod").ZodObject<{
        STATE: import("zod").ZodOptional<import("zod").ZodString>;
        CITY: import("zod").ZodOptional<import("zod").ZodString>;
        DISTRICT: import("zod").ZodOptional<import("zod").ZodString>;
        WARD: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>>;
    street: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    houseNumber: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    address: import("zod").ZodString;
    addressInstruction: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    zipcode: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    town: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    labelId: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    isDeliveryAddress: import("zod").ZodDefault<import("zod").ZodBoolean>;
    isDefault: import("zod").ZodDefault<import("zod").ZodBoolean>;
    deletedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    geoinfo: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodObject<{
        region: import("zod").ZodObject<{
            latitude: import("zod").ZodNumber;
            longitude: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: import("zod").ZodOptional<import("zod").ZodBoolean>;
        user_verified: import("zod").ZodOptional<import("zod").ZodBoolean>;
        auto_fill: import("zod").ZodBoolean;
        source: import("zod").ZodOptional<import("zod").ZodString>;
        timestamp: import("zod").ZodOptional<import("zod").ZodString>;
        additionalData: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }>>>;
    latitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    longitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    createdAt: import("zod").ZodDefault<import("zod").ZodDate>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    userId: number;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    isDeliveryAddress?: boolean | undefined;
    isDefault?: boolean | undefined;
    deletedAt?: Date | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;
export declare class CreateAddressShipResDTO extends CreateAddressShipResDTO_base {
}
declare const UpdateAddressShipResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdAt: Date;
    userId: number;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    isDeliveryAddress: boolean;
    isDefault: boolean;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    deletedAt?: Date | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    updatedAt?: Date | undefined;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    phone: import("zod").ZodString;
    countryId: import("zod").ZodNumber;
    divisionId: import("zod").ZodNumber;
    divisionPath: import("zod").ZodNullable<import("zod").ZodEffects<import("zod").ZodObject<{
        STATE: import("zod").ZodOptional<import("zod").ZodString>;
        CITY: import("zod").ZodOptional<import("zod").ZodString>;
        DISTRICT: import("zod").ZodOptional<import("zod").ZodString>;
        WARD: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }, {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    }>>;
    street: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    houseNumber: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    address: import("zod").ZodString;
    addressInstruction: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    zipcode: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    town: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    labelId: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    isDeliveryAddress: import("zod").ZodDefault<import("zod").ZodBoolean>;
    isDefault: import("zod").ZodDefault<import("zod").ZodBoolean>;
    deletedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    geoinfo: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodObject<{
        region: import("zod").ZodObject<{
            latitude: import("zod").ZodNumber;
            longitude: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: import("zod").ZodOptional<import("zod").ZodBoolean>;
        user_verified: import("zod").ZodOptional<import("zod").ZodBoolean>;
        auto_fill: import("zod").ZodBoolean;
        source: import("zod").ZodOptional<import("zod").ZodString>;
        timestamp: import("zod").ZodOptional<import("zod").ZodString>;
        additionalData: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }, {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    }>>>;
    latitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    longitude: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNumber>>;
    createdAt: import("zod").ZodDefault<import("zod").ZodDate>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    userId: number;
    countryId: number;
    phone: string;
    divisionId: number;
    divisionPath: {
        STATE?: string | undefined;
        CITY?: string | undefined;
        DISTRICT?: string | undefined;
        WARD?: string | undefined;
    } | null;
    address: string;
    street?: string | null | undefined;
    houseNumber?: string | null | undefined;
    addressInstruction?: string | null | undefined;
    zipcode?: string | null | undefined;
    town?: string | null | undefined;
    labelId?: number | null | undefined;
    isDeliveryAddress?: boolean | undefined;
    isDefault?: boolean | undefined;
    deletedAt?: Date | null | undefined;
    geoinfo?: {
        region: {
            latitude: number;
            longitude: number;
        };
        auto_fill: boolean;
        user_adjusted?: boolean | undefined;
        user_verified?: boolean | undefined;
        source?: string | undefined;
        timestamp?: string | undefined;
        additionalData?: Record<string, unknown> | undefined;
    } | null | undefined;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;
export declare class UpdateAddressShipResDTO extends UpdateAddressShipResDTO_base {
}
export {};
