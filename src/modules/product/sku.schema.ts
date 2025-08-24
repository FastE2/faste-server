import { z } from 'zod';

/** Reusable validators */
const idSchema = z.coerce.number().int().positive();
const nonNegInt = z.coerce.number().int().min(0);
const posInt = z.coerce.number().int().positive();

// name + uuid
const skuCodeSchema = z
  .string()
  .min(1, 'skuCode không được rỗng')
  .max(191, 'skuCode quá dài')
  .regex(/^[A-Za-z0-9._-]+$/, 'skuCode chỉ gồm chữ, số, dấu . _ -');

// attributes is JSON object {"color": "red", "size": "L"}
const attributesSchema = z
  .record(z.string(), z.string())
  .describe('{"color": "red", "size": "L"}');

const imageSchema = z.string().default('');

export const SKUSchema = z.object({
  skuCode: skuCodeSchema,
  productId: idSchema,
  image: imageSchema,
  price: nonNegInt,
  attributes: attributesSchema,
  quantity: nonNegInt.optional().default(0),
  sold: nonNegInt.optional().default(0),

  weightGram: z.coerce.number().int().min(0).optional(),
  lengthCm: z.coerce.number().int().min(0).optional(),
  widthCm: z.coerce.number().int().min(0).optional(),
  heightCm: z.coerce.number().int().min(0).optional(),

  createdById: z.number(),
  updatedById: z.number().optional().nullable(),
  deletedById: z.number().optional().nullable(),
  deletedAt: z.string().datetime().optional().nullable(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const UpsertSKUBodySchema = z.object({
  attributes: attributesSchema,
  image: imageSchema,
  price: nonNegInt,
  quantity: nonNegInt.optional().default(0),

  weightGram: z.coerce.number().int().min(0).optional(),
  lengthCm: z.coerce.number().int().min(0).optional(),
  widthCm: z.coerce.number().int().min(0).optional(),
  heightCm: z.coerce.number().int().min(0).optional(),
});

/** UPDATE: tất cả optional, nhưng cần id bên ngoài (params) */
export const skuUpdateSchema = z
  .object({
    skuCode: skuCodeSchema.optional(),
    image: imageSchema.optional(),
    price: nonNegInt.optional(),
    attributes: attributesSchema.optional(),
    quantity: nonNegInt.optional(),
    sold: nonNegInt.optional(),

    weightGram: z.coerce.number().int().min(0).optional().nullable(),
    lengthCm: z.coerce.number().int().min(0).optional().nullable(),
    widthCm: z.coerce.number().int().min(0).optional().nullable(),
    heightCm: z.coerce.number().int().min(0).optional().nullable(),

    // Audit khi update
    updatedById: idSchema.optional(),

    // Soft delete hỗ trợ nếu bạn muốn từ API update
    deletedAt: z.coerce.date().optional().nullable(),
    deletedById: idSchema.optional().nullable(),
  })
  // Không bắt buộc nhưng tránh gửi payload rỗng
  .refine(
    (data) => Object.keys(data).length > 0,
    'Payload update không được rỗng',
  );

/** PARAMS cho route /sku/:id */
export const skuIdParamSchema = z.object({
  id: idSchema,
});

// /** LIST / QUERY: phân trang + filter + sort */
// export const skuListQuerySchema = z
//   .object({
//     page: z.coerce.number().int().min(1).default(1),
//     limit: z.coerce.number().int().min(1).max(100).default(20),

//     // Tìm kiếm cơ bản
//     q: z.string().trim().optional(), // match name/skuCode phía repo
//     productId: idSchema.optional(),
//     skuCode: skuCodeSchema.optional(),

//     // Khoảng giá
//     priceMin: nonNegInt.optional(),
//     priceMax: nonNegInt.optional(),

//     // Lọc tồn kho
//     inStock: z
//       .union([z.literal("true"), z.literal("false")])
//       .optional()
//       .transform((v) => (v ? v === "true" : undefined)),

//     // Soft delete filter
//     includeDeleted: z
//       .union([z.literal("true"), z.literal("false")])
//       .optional()
//       .transform((v) => (v ? v === "true" : undefined)),

//     // Sort
//     orderBy: z
//       .enum([
//         "createdAt",
//         "updatedAt",
//         "price",
//         "quantity",
//         "sold",
//         "name",
//         "skuCode",
//       ])
//       .default("createdAt"),
//     order: z.enum(["asc", "desc"]).default("desc"),
//   })
//   .refine(
//     (q) => !(q.priceMin && q.priceMax) || q.priceMax >= q.priceMin,
//     { message: "priceMax phải ≥ priceMin", path: ["priceMax"] }
//   );

// /** BATCH: ví dụ bulk update stock */
// export const skuBulkAdjustStockSchema = z.object({
//   updatedById: idSchema,
//   items: z
//     .array(
//       z.object({
//         skuId: idSchema,
//         // deltaQuantity có thể âm (xuất kho) hoặc dương (nhập kho)
//         deltaQuantity: z.number().int(),
//       })
//     )
//     .min(1),
// });
