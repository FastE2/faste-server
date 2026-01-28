import { z } from 'zod';
export declare const AddressShipSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    name: z.ZodString;
    phone: z.ZodString;
    countryId: z.ZodNumber;
    divisionId: z.ZodNumber;
    divisionPath: z.ZodNullable<z.ZodEffects<z.ZodObject<{
        STATE: z.ZodOptional<z.ZodString>;
        CITY: z.ZodOptional<z.ZodString>;
        DISTRICT: z.ZodOptional<z.ZodString>;
        WARD: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    houseNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodString;
    addressInstruction: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    zipcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    town: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    labelId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isDeliveryAddress: z.ZodDefault<z.ZodBoolean>;
    isDefault: z.ZodDefault<z.ZodBoolean>;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    geoinfo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        region: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: z.ZodOptional<z.ZodBoolean>;
        user_verified: z.ZodOptional<z.ZodBoolean>;
        auto_fill: z.ZodBoolean;
        source: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
        additionalData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
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
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
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
}>;
export declare const CreateAddressShipBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    name: z.ZodString;
    phone: z.ZodString;
    countryId: z.ZodNumber;
    divisionId: z.ZodNumber;
    divisionPath: z.ZodNullable<z.ZodEffects<z.ZodObject<{
        STATE: z.ZodOptional<z.ZodString>;
        CITY: z.ZodOptional<z.ZodString>;
        DISTRICT: z.ZodOptional<z.ZodString>;
        WARD: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    houseNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodString;
    addressInstruction: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    zipcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    town: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    labelId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isDeliveryAddress: z.ZodDefault<z.ZodBoolean>;
    isDefault: z.ZodDefault<z.ZodBoolean>;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    geoinfo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        region: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: z.ZodOptional<z.ZodBoolean>;
        user_verified: z.ZodOptional<z.ZodBoolean>;
        auto_fill: z.ZodBoolean;
        source: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
        additionalData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
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
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "name" | "countryId" | "latitude" | "longitude" | "phone" | "divisionId" | "divisionPath" | "street" | "houseNumber" | "address" | "addressInstruction" | "zipcode" | "town" | "labelId" | "isDeliveryAddress" | "isDefault" | "geoinfo">, "strict", z.ZodTypeAny, {
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
}, {
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
export declare const UpdateAddressShipBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    name: z.ZodString;
    phone: z.ZodString;
    countryId: z.ZodNumber;
    divisionId: z.ZodNumber;
    divisionPath: z.ZodNullable<z.ZodEffects<z.ZodObject<{
        STATE: z.ZodOptional<z.ZodString>;
        CITY: z.ZodOptional<z.ZodString>;
        DISTRICT: z.ZodOptional<z.ZodString>;
        WARD: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    houseNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodString;
    addressInstruction: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    zipcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    town: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    labelId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isDeliveryAddress: z.ZodDefault<z.ZodBoolean>;
    isDefault: z.ZodDefault<z.ZodBoolean>;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    geoinfo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        region: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: z.ZodOptional<z.ZodBoolean>;
        user_verified: z.ZodOptional<z.ZodBoolean>;
        auto_fill: z.ZodBoolean;
        source: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
        additionalData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
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
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "name" | "countryId" | "latitude" | "longitude" | "phone" | "divisionId" | "divisionPath" | "street" | "houseNumber" | "address" | "addressInstruction" | "zipcode" | "town" | "labelId" | "isDeliveryAddress" | "isDefault" | "geoinfo">, "strict", z.ZodTypeAny, {
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
}, {
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
export declare const GetAddressShipByIdResSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    name: z.ZodString;
    phone: z.ZodString;
    countryId: z.ZodNumber;
    divisionId: z.ZodNumber;
    divisionPath: z.ZodNullable<z.ZodEffects<z.ZodObject<{
        STATE: z.ZodOptional<z.ZodString>;
        CITY: z.ZodOptional<z.ZodString>;
        DISTRICT: z.ZodOptional<z.ZodString>;
        WARD: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    houseNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodString;
    addressInstruction: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    zipcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    town: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    labelId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isDeliveryAddress: z.ZodDefault<z.ZodBoolean>;
    isDefault: z.ZodDefault<z.ZodBoolean>;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    geoinfo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        region: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: z.ZodOptional<z.ZodBoolean>;
        user_verified: z.ZodOptional<z.ZodBoolean>;
        auto_fill: z.ZodBoolean;
        source: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
        additionalData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
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
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
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
}>;
export declare const GetAddressShipResSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    name: z.ZodString;
    phone: z.ZodString;
    countryId: z.ZodNumber;
    divisionId: z.ZodNumber;
    divisionPath: z.ZodNullable<z.ZodEffects<z.ZodObject<{
        STATE: z.ZodOptional<z.ZodString>;
        CITY: z.ZodOptional<z.ZodString>;
        DISTRICT: z.ZodOptional<z.ZodString>;
        WARD: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    houseNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodString;
    addressInstruction: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    zipcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    town: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    labelId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isDeliveryAddress: z.ZodDefault<z.ZodBoolean>;
    isDefault: z.ZodDefault<z.ZodBoolean>;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    geoinfo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        region: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: z.ZodOptional<z.ZodBoolean>;
        user_verified: z.ZodOptional<z.ZodBoolean>;
        auto_fill: z.ZodBoolean;
        source: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
        additionalData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
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
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
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
}>, "many">;
export declare const CreateAddressShipResSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    name: z.ZodString;
    phone: z.ZodString;
    countryId: z.ZodNumber;
    divisionId: z.ZodNumber;
    divisionPath: z.ZodNullable<z.ZodEffects<z.ZodObject<{
        STATE: z.ZodOptional<z.ZodString>;
        CITY: z.ZodOptional<z.ZodString>;
        DISTRICT: z.ZodOptional<z.ZodString>;
        WARD: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    houseNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodString;
    addressInstruction: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    zipcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    town: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    labelId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isDeliveryAddress: z.ZodDefault<z.ZodBoolean>;
    isDefault: z.ZodDefault<z.ZodBoolean>;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    geoinfo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        region: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: z.ZodOptional<z.ZodBoolean>;
        user_verified: z.ZodOptional<z.ZodBoolean>;
        auto_fill: z.ZodBoolean;
        source: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
        additionalData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
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
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
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
}>;
export declare const UpdateAddressShipResSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    name: z.ZodString;
    phone: z.ZodString;
    countryId: z.ZodNumber;
    divisionId: z.ZodNumber;
    divisionPath: z.ZodNullable<z.ZodEffects<z.ZodObject<{
        STATE: z.ZodOptional<z.ZodString>;
        CITY: z.ZodOptional<z.ZodString>;
        DISTRICT: z.ZodOptional<z.ZodString>;
        WARD: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    houseNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodString;
    addressInstruction: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    zipcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    town: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    labelId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isDeliveryAddress: z.ZodDefault<z.ZodBoolean>;
    isDefault: z.ZodDefault<z.ZodBoolean>;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    geoinfo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        region: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        user_adjusted: z.ZodOptional<z.ZodBoolean>;
        user_verified: z.ZodOptional<z.ZodBoolean>;
        auto_fill: z.ZodBoolean;
        source: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
        additionalData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
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
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
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
}>;
export type AddressShipType = z.infer<typeof AddressShipSchema>;
export type CreateAddressShipBodyType = z.infer<typeof CreateAddressShipBodySchema>;
export type UpdateAddressShipBodyType = z.infer<typeof UpdateAddressShipBodySchema>;
