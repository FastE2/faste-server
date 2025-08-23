import { ProductStatus } from '@prisma/client';
import { PRODUCT_STATUS } from 'src/common/constants/product.constant';
import { generateSKUs } from 'src/common/helpers/generate-skus.helper';
import { z } from 'zod';
import { SKUSchema, UpsertSKUBodySchema } from './sku.schema';
import { normalize } from 'src/common/helpers/normalize.helper';

export const VariantSchema = z.object({
  value: z.string().trim(),
  options: z.array(z.string().trim()),
});

export const VariantsSchema = z
  .array(VariantSchema)
  .superRefine((variants, ctx) => {
    // Kiểm tra variants và variant option có bị trùng hay không
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      const isExistingVariant =
        variants.findIndex(
          (v) => v.value.toLowerCase() === variant.value.toLowerCase(),
        ) !== i;
      if (isExistingVariant) {
        return ctx.addIssue({
          code: 'custom',
          message: `Giá trị ${variant.value} đã tồn tại trong danh sách variants. Vui lòng kiểm tra lại.`,
          path: ['variants'],
        });
      }
      const isDifferentOption = variant.options.some((option, index) => {
        const isExistingOption =
          variant.options.findIndex(
            (o) => o.toLowerCase() === option.toLowerCase(),
          ) !== index;
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

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().trim().max(500),
  description: z.string(),
  basePrice: z.number(),
  brandId: z.number(),
  images: z.array(z.string().url()),
  variants: VariantsSchema,
  status: z.nativeEnum(ProductStatus),
  publishedAt: z.string().datetime().optional().nullable(),
  totalViews: z.number().int().optional().default(0),
  slugId: z.string(),

  createdById: z.number(),
  updatedById: z.number().optional().nullable(),
  deletedById: z.number().optional().nullable(),
  deletedAt: z.string().datetime().optional().nullable(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  likes: z.array(z.any()).optional(),
  // skus: z.array(z.any()).optional(),
  // categories: z.array(z.any()).optional(),
  // discounts: z.array(z.any()).optional(),
  // productTranslations: z.array(z.any()).optional(),
});

export const GetParamSlugIdSchema = z.object({
  slugId: z.string(),
});

// Schema cho input khi tạo mới product
export const CreateProductSchema = ProductSchema.pick({
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

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(500),
  description: z.string().default(''),
  parentCategoryId: z.number().nullable(),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export const CreateProductBodySchema = ProductSchema.pick({
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
    categories: z.array(z.coerce.number().int().positive()),
    skus: z.array(UpsertSKUBodySchema),
  })
  .strict()
  .superRefine(({ variants, skus }, ctx) => {
    const skuValueArray = generateSKUs(variants);
    if (skus.length !== skuValueArray.length) {
      return ctx.addIssue({
        code: 'custom',
        path: ['skus'],
        message: `The number of SKUs should be ${skuValueArray.length}. Please check again`,
      });
    }

    let wrongSKUIndex: number = -1;
    const isValidSKUs = skus.every((sku, index) => {
      const isValid =
        normalize(sku.attributes) ===
        normalize(skuValueArray[index].attributes);
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

export const CreateProductInDBBodySchema = ProductSchema.pick({
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
    categories: z.array(z.coerce.number().int().positive()),
    skus: z.array(
      SKUSchema.pick({
        image: true,
        price: true,
        attributes: true,
        heightCm: true,
        lengthCm: true,
        quantity: true,
        skuCode: true,
        weightGram: true,
        widthCm: true,
      }),
    ),
  })
  .strict()
  .superRefine(({ variants, skus }, ctx) => {
    const skuValueArray = generateSKUs(variants);
    if (skus.length !== skuValueArray.length) {
      return ctx.addIssue({
        code: 'custom',
        path: ['skus'],
        message: `The number of SKUs should be ${skuValueArray.length}. Please check again`,
      });
    }

    let wrongSKUIndex: number = -1;
    const isValidSKUs = skus.every((sku, index) => {
      const isValid =
        normalize(sku.attributes) ===
        normalize(skuValueArray[index].attributes);
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

export const UpdateProductBodySchema = CreateProductInDBBodySchema;

export type UpdateProductBodyType = z.infer<typeof UpdateProductBodySchema>;

export type CreateProductBodyType = z.infer<typeof CreateProductBodySchema>;

export const UpdateCategoryBodySchema = CreateProductBodySchema;
export type CreateProductInDBBodyType = z.infer<
  typeof CreateProductInDBBodySchema
>;
export type VariantsType = z.infer<typeof VariantsSchema>;
