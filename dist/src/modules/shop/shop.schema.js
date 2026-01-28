"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShopResSchema = exports.CreateShopResSchema = exports.GetShopResSchema = exports.GetShopByIdResSchema = exports.UpdateShopBodySchema = exports.RegisterShopBodySchema = exports.GetParamSlugSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.GetParamSlugSchema = zod_1.z.object({
    slug: zod_1.z.string(),
});
const ShopSchema = zod_1.z.object({
    shopid: zod_1.z.number(),
    name: zod_1.z.string().max(200),
    slug: zod_1.z.string().max(200),
    logo: zod_1.z.string().max(1000).optional().default(''),
    cover: zod_1.z.string().nullable().optional(),
    banner: zod_1.z.string().nullable().optional(),
    description: zod_1.z.string().default(''),
    followerCount: zod_1.z.number().nullable().optional(),
    ratingStar: zod_1.z.number().optional().default(0),
    responseRate: zod_1.z.number().optional().default(100),
    responseTime: zod_1.z.number().optional().default(0),
    addressShipId: zod_1.z.number(),
    businessType: zod_1.z.nativeEnum(client_1.BusinessType),
    taxCode: zod_1.z.string().length(14),
    status: zod_1.z.nativeEnum(client_1.ShopStatus),
    isActive: zod_1.z.boolean().default(true),
    itemCount: zod_1.z.number().nullable().optional().default(0),
    paymentMethods: zod_1.z.array(zod_1.z.nativeEnum(client_1.PaymentMethod)),
    createdAt: zod_1.z.date().default(() => new Date()),
    updatedAt: zod_1.z.date().default(() => new Date()),
    deletedAt: zod_1.z.date().nullable().optional(),
    deletedById: zod_1.z.number().nullable().optional(),
});
exports.RegisterShopBodySchema = ShopSchema.pick({
    name: true,
    slug: true,
    description: true,
    logo: true,
    addressShipId: true,
    paymentMethods: true,
    taxCode: true,
    businessType: true,
}).extend({
    deliveryTypeIds: zod_1.z.array(zod_1.z.number()),
});
exports.UpdateShopBodySchema = ShopSchema.pick({
    name: true,
    description: true,
    logo: true,
    addressShipId: true,
    paymentMethods: true,
    taxCode: true,
    businessType: true,
    banner: true,
    cover: true,
}).extend({
    deliveryTypeIds: zod_1.z.array(zod_1.z.number()),
});
exports.GetShopByIdResSchema = ShopSchema;
exports.GetShopResSchema = zod_1.z.array(ShopSchema);
exports.CreateShopResSchema = ShopSchema;
exports.UpdateShopResSchema = ShopSchema;
//# sourceMappingURL=shop.schema.js.map