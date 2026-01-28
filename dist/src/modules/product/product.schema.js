"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryBodySchema = exports.UpdateProductBodySchema = exports.GetProductsQuerySchema = exports.CreateProductInDBBodySchema = exports.CreateProductBodySchema = exports.CategorySchema = exports.CreateProductSchema = exports.GetParamSlugIdSchema = exports.GetAllProductPublicResSchema = exports.ProductSchema = exports.VariantsSchema = exports.VariantSchema = void 0;
const client_1 = require("@prisma/client");
const product_constant_1 = require("../../common/constants/product.constant");
const generate_skus_helper_1 = require("../../common/helpers/generate-skus.helper");
const zod_1 = require("zod");
const sku_schema_1 = require("./sku.schema");
const normalize_helper_1 = require("../../common/helpers/normalize.helper");
exports.VariantSchema = zod_1.z.object({
    value: zod_1.z.string().trim(),
    options: zod_1.z.array(zod_1.z.string().trim()),
});
exports.VariantsSchema = zod_1.z
    .array(exports.VariantSchema)
    .superRefine((variants, ctx) => {
    for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        const isExistingVariant = variants.findIndex((v) => v.value.toLowerCase() === variant.value.toLowerCase()) !== i;
        if (isExistingVariant) {
            return ctx.addIssue({
                code: 'custom',
                message: `Giá trị ${variant.value} đã tồn tại trong danh sách variants. Vui lòng kiểm tra lại.`,
                path: ['variants'],
            });
        }
        const isDifferentOption = variant.options.some((option, index) => {
            const isExistingOption = variant.options.findIndex((o) => o.toLowerCase() === option.toLowerCase()) !== index;
            return isExistingOption;
        });
        if (isDifferentOption) {
            return ctx.addIssue({
                code: 'custom',
                message: `Variant ${variant.value} chứa các option trùng tên với nhau. Vui lòng kiểm tra lại.`,
                path: ['variants'],
            });
        }
    }
});
exports.ProductSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().trim().max(500),
    description: zod_1.z.string(),
    basePrice: zod_1.z.number(),
    brandId: zod_1.z.number(),
    images: zod_1.z.array(zod_1.z.string().url()),
    variants: exports.VariantsSchema,
    status: zod_1.z.nativeEnum(client_1.ProductStatus),
    publishedAt: zod_1.z.string().datetime().optional().nullable(),
    totalViews: zod_1.z.number().int().optional().default(0),
    slugId: zod_1.z.string(),
    createdById: zod_1.z.number(),
    updatedById: zod_1.z.number().optional().nullable(),
    deletedById: zod_1.z.number().optional().nullable(),
    deletedAt: zod_1.z.string().datetime().optional().nullable(),
    createdAt: zod_1.z.string().datetime().optional(),
    updatedAt: zod_1.z.string().datetime().optional(),
    likes: zod_1.z.array(zod_1.z.any()).optional(),
    weightGram: zod_1.z.coerce.number().int().min(0).optional().nullable(),
    lengthCm: zod_1.z.coerce.number().int().min(0).optional().nullable(),
    widthCm: zod_1.z.coerce.number().int().min(0).optional().nullable(),
    heightCm: zod_1.z.coerce.number().int().min(0).optional().nullable(),
});
exports.GetAllProductPublicResSchema = zod_1.z.object({
    data: exports.ProductSchema.omit({
        likes: true,
    }).extend({
        _count: zod_1.z.object({ likes: zod_1.z.number() }),
    }),
    totalItem: zod_1.z.number(),
    page: zod_1.z.number(),
    limit: zod_1.z.number(),
    totalPage: zod_1.z.number(),
});
exports.GetParamSlugIdSchema = zod_1.z.object({
    slugId: zod_1.z.string(),
});
exports.CreateProductSchema = exports.ProductSchema.pick({
    name: true,
    description: true,
    basePrice: true,
    brandId: true,
    images: true,
    variants: true,
    slugId: true,
    status: true,
    publishedAt: true,
});
exports.CategorySchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(1).max(500),
    description: zod_1.z.string().default(''),
    parentCategoryId: zod_1.z.number().nullable(),
    createdById: zod_1.z.number().nullable(),
    updatedById: zod_1.z.number().nullable(),
    deletedById: zod_1.z.number().nullable(),
    deletedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date().nullable(),
});
exports.CreateProductBodySchema = exports.ProductSchema.pick({
    name: true,
    description: true,
    basePrice: true,
    brandId: true,
    images: true,
    variants: true,
    status: true,
    slugId: true,
})
    .extend({
    categories: zod_1.z.array(zod_1.z.coerce.number().int().positive()),
    skus: zod_1.z.array(sku_schema_1.UpsertSKUBodySchema),
})
    .strict()
    .superRefine(({ variants, skus }, ctx) => {
    const skuValueArray = (0, generate_skus_helper_1.generateSKUs)(variants);
    if (skus.length !== skuValueArray.length) {
        return ctx.addIssue({
            code: 'custom',
            path: ['skus'],
            message: `The number of SKUs should be ${skuValueArray.length}. Please check again`,
        });
    }
    let wrongSKUIndex = -1;
    const isValidSKUs = skus.every((sku, index) => {
        const isValid = (0, normalize_helper_1.normalize)(sku.attributes) ===
            (0, normalize_helper_1.normalize)(skuValueArray[index].attributes);
        if (!isValid) {
            wrongSKUIndex = index;
        }
        return isValid;
    });
    if (!isValidSKUs) {
        return ctx.addIssue({
            code: 'custom',
            path: ['skus'],
            message: `The SKU index value ${wrongSKUIndex} is invalid. Please check again`,
        });
    }
});
exports.CreateProductInDBBodySchema = exports.ProductSchema.pick({
    name: true,
    description: true,
    basePrice: true,
    brandId: true,
    images: true,
    variants: true,
    status: true,
    slugId: true,
})
    .extend({
    categories: zod_1.z.array(zod_1.z.coerce.number().int().positive()),
    skus: zod_1.z.array(sku_schema_1.SKUSchema.pick({
        image: true,
        price: true,
        attributes: true,
        heightCm: true,
        lengthCm: true,
        quantity: true,
        skuCode: true,
        weightGram: true,
        widthCm: true,
    })),
})
    .strict()
    .superRefine(({ variants, skus }, ctx) => {
    const skuValueArray = (0, generate_skus_helper_1.generateSKUs)(variants);
    if (skus.length !== skuValueArray.length) {
        return ctx.addIssue({
            code: 'custom',
            path: ['skus'],
            message: `The number of SKUs should be ${skuValueArray.length}. Please check again`,
        });
    }
    let wrongSKUIndex = -1;
    const isValidSKUs = skus.every((sku, index) => {
        const isValid = (0, normalize_helper_1.normalize)(sku.attributes) ===
            (0, normalize_helper_1.normalize)(skuValueArray[index].attributes);
        if (!isValid) {
            wrongSKUIndex = index;
        }
        return isValid;
    });
    if (!isValidSKUs) {
        return ctx.addIssue({
            code: 'custom',
            path: ['skus'],
            message: `The SKU index value ${wrongSKUIndex} is invalid. Please check again`,
        });
    }
});
exports.GetProductsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().default(10),
    name: zod_1.z.string().optional(),
    brandIds: zod_1.z
        .preprocess((value) => {
        if (typeof value === 'string') {
            return [Number(value)];
        }
        return value;
    }, zod_1.z.array(zod_1.z.coerce.number().int().positive()))
        .optional(),
    categories: zod_1.z
        .preprocess((value) => {
        if (typeof value === 'string') {
            return [Number(value)];
        }
        return value;
    }, zod_1.z.array(zod_1.z.coerce.number().int().positive()))
        .optional(),
    minPrice: zod_1.z.coerce.number().positive().optional(),
    maxPrice: zod_1.z.coerce.number().positive().optional(),
    createdById: zod_1.z.coerce.number().int().positive().optional(),
    orderBy: zod_1.z.enum([product_constant_1.OrderBy.Asc, product_constant_1.OrderBy.Desc]).default(product_constant_1.OrderBy.Desc),
    sortBy: zod_1.z
        .enum([product_constant_1.SortBy.CreatedAt, product_constant_1.SortBy.Price, product_constant_1.SortBy.Sale])
        .default(product_constant_1.SortBy.CreatedAt),
});
exports.UpdateProductBodySchema = exports.CreateProductInDBBodySchema;
exports.UpdateCategoryBodySchema = exports.CreateProductBodySchema;
//# sourceMappingURL=product.schema.js.map