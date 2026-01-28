"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAddressShipResSchema = exports.CreateAddressShipResSchema = exports.GetAddressShipResSchema = exports.GetAddressShipByIdResSchema = exports.UpdateAddressShipBodySchema = exports.CreateAddressShipBodySchema = exports.AddressShipSchema = void 0;
const division_level_constant_1 = require("../../common/constants/division-level.constant");
const zod_1 = require("zod");
const GeoinfoSchema = zod_1.z.object({
    region: zod_1.z.object({
        latitude: zod_1.z.number(),
        longitude: zod_1.z.number(),
    }),
    user_adjusted: zod_1.z.boolean().optional(),
    user_verified: zod_1.z.boolean().optional(),
    auto_fill: zod_1.z.boolean(),
    source: zod_1.z.string().optional(),
    timestamp: zod_1.z.string().optional(),
    additionalData: zod_1.z.record(zod_1.z.unknown()).optional(),
});
const DivisionRecordSchema = zod_1.z
    .object({
    [division_level_constant_1.DIVISION_LEVEL.STATE]: zod_1.z.string().optional(),
    [division_level_constant_1.DIVISION_LEVEL.CITY]: zod_1.z.string().optional(),
    [division_level_constant_1.DIVISION_LEVEL.DISTRICT]: zod_1.z.string().optional(),
    [division_level_constant_1.DIVISION_LEVEL.WARD]: zod_1.z.string().optional(),
})
    .refine((data) => data !== null, {
    message: 'Division path cannot be null',
});
exports.AddressShipSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    userId: zod_1.z.number().int(),
    name: zod_1.z.string(),
    phone: zod_1.z.string(),
    countryId: zod_1.z.number().int(),
    divisionId: zod_1.z.number().int(),
    divisionPath: DivisionRecordSchema.nullable(),
    street: zod_1.z.string().nullable().optional(),
    houseNumber: zod_1.z.string().nullable().optional(),
    address: zod_1.z.string(),
    addressInstruction: zod_1.z.string().nullable().optional(),
    zipcode: zod_1.z.string().nullable().optional(),
    town: zod_1.z.string().nullable().optional(),
    labelId: zod_1.z.number().int().nullable().optional(),
    isDeliveryAddress: zod_1.z.boolean().default(true),
    isDefault: zod_1.z.boolean().default(false),
    deletedAt: zod_1.z.date().nullable().optional(),
    geoinfo: GeoinfoSchema.nullable().optional(),
    latitude: zod_1.z.number().nullable().optional(),
    longitude: zod_1.z.number().nullable().optional(),
    createdAt: zod_1.z.date().default(new Date()),
    updatedAt: zod_1.z.date().optional(),
});
exports.CreateAddressShipBodySchema = exports.AddressShipSchema.pick({
    address: true,
    addressInstruction: true,
    countryId: true,
    divisionId: true,
    divisionPath: true,
    geoinfo: true,
    houseNumber: true,
    isDefault: true,
    isDeliveryAddress: true,
    labelId: true,
    latitude: true,
    longitude: true,
    name: true,
    phone: true,
    street: true,
    town: true,
    zipcode: true,
}).strict();
exports.UpdateAddressShipBodySchema = exports.CreateAddressShipBodySchema;
exports.GetAddressShipByIdResSchema = exports.AddressShipSchema;
exports.GetAddressShipResSchema = zod_1.z.array(exports.AddressShipSchema);
exports.CreateAddressShipResSchema = exports.AddressShipSchema;
exports.UpdateAddressShipResSchema = exports.AddressShipSchema;
//# sourceMappingURL=address-ship.schema.js.map