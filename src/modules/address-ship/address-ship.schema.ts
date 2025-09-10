import { DIVISION_LEVEL } from 'src/common/constants/division-level.constant';
import { z } from 'zod';

const GeoinfoSchema = z.object({
  region: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  user_adjusted: z.boolean().optional(),
  user_verified: z.boolean().optional(),
  auto_fill: z.boolean(),
  source: z.string().optional(),
  timestamp: z.string().optional(),

  additionalData: z.record(z.unknown()).optional(),
});

const DivisionRecordSchema = z
  .object({
    [DIVISION_LEVEL.STATE]: z.string().optional(),
    [DIVISION_LEVEL.CITY]: z.string().optional(),
    [DIVISION_LEVEL.DISTRICT]: z.string().optional(),
    [DIVISION_LEVEL.WARD]: z.string().optional(),
  })
  .refine((data) => data !== null, {
    message: 'Division path cannot be null',
  });

export const AddressShipSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  name: z.string(),
  phone: z.string(),
  countryId: z.number().int(),
  divisionId: z.number().int(),

  divisionPath: DivisionRecordSchema.nullable(), // It's a JSON object, so we define it as `unknown` (could be refined based on your data structure)
  street: z.string().nullable().optional(),
  houseNumber: z.string().nullable().optional(),
  address: z.string(),
  addressInstruction: z.string().nullable().optional(),
  zipcode: z.string().nullable().optional(),
  town: z.string().nullable().optional(),
  labelId: z.number().int().nullable().optional(),
  isDeliveryAddress: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  deletedAt: z.date().nullable().optional(),

  geoinfo: GeoinfoSchema.nullable().optional(),

  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),

  createdAt: z.date().default(new Date()),
  updatedAt: z.date().optional(),
});

export const CreateAddressShipBodySchema = AddressShipSchema.pick({
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

export const UpdateAddressShipBodySchema = CreateAddressShipBodySchema;

export const GetAddressShipByIdResSchema = AddressShipSchema;
export const GetAddressShipResSchema = z.array(AddressShipSchema);
export const CreateAddressShipResSchema = AddressShipSchema;
export const UpdateAddressShipResSchema = AddressShipSchema;

export type AddressShipType = z.infer<typeof AddressShipSchema>;
export type CreateAddressShipBodyType = z.infer<
  typeof CreateAddressShipBodySchema
>;
export type UpdateAddressShipBodyType = z.infer<
  typeof UpdateAddressShipBodySchema
>;
