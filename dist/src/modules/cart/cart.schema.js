"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCartBodySchema = exports.UpdateCartItemBodySchema = exports.AddToCartBodySchema = exports.CartItemDetailSchema = exports.CartItemSchema = void 0;
const user_schema_1 = require("../../common/schemas/user.schema");
const zod_1 = require("zod");
const sku_schema_1 = require("../product/sku.schema");
const product_schema_1 = require("../product/product.schema");
const product_translation_schema_1 = require("../../common/schemas/product-translation.schema");
exports.CartItemSchema = zod_1.z.object({
    id: zod_1.z.number(),
    quantity: zod_1.z.number().int().positive(),
    skuId: zod_1.z.number(),
    userId: zod_1.z.number(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.CartItemDetailSchema = zod_1.z.object({
    shop: user_schema_1.UserSchema.pick({
        id: true,
        name: true,
        avatar: true,
    }),
    cartItems: zod_1.z.array(exports.CartItemSchema.extend({
        sku: sku_schema_1.SKUSchema.extend({
            product: product_schema_1.ProductSchema.extend({
                productTranslations: zod_1.z.array(product_translation_schema_1.ProductTranslationSchema.omit({
                    createdById: true,
                    updatedById: true,
                    deletedById: true,
                    deletedAt: true,
                    createdAt: true,
                    updatedAt: true,
                })),
            }).omit({
                createdById: true,
                updatedById: true,
                deletedById: true,
                deletedAt: true,
                createdAt: true,
                updatedAt: true,
            }),
        }).omit({
            createdById: true,
            updatedById: true,
            deletedById: true,
            deletedAt: true,
            createdAt: true,
            updatedAt: true,
        }),
    })),
});
exports.AddToCartBodySchema = exports.CartItemSchema.pick({
    skuId: true,
    quantity: true,
}).strict();
exports.UpdateCartItemBodySchema = exports.AddToCartBodySchema;
exports.DeleteCartBodySchema = zod_1.z
    .object({
    cartItemIds: zod_1.z.array(zod_1.z.number().int().positive()),
})
    .strict();
//# sourceMappingURL=cart.schema.js.map