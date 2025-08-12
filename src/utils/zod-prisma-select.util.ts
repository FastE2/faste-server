import { z } from 'zod';

/**
 * Gỡ hết các wrapper để lấy schema gốc
 */
function unwrapZod(schema: z.ZodTypeAny): z.ZodTypeAny {
  let current = schema;

  while (true) {
    const typeName = current._def.typeName;

    switch (typeName) {
      case z.ZodFirstPartyTypeKind.ZodOptional:
      case z.ZodFirstPartyTypeKind.ZodNullable:
      case z.ZodFirstPartyTypeKind.ZodDefault:
      case z.ZodFirstPartyTypeKind.ZodEffects:
      case z.ZodFirstPartyTypeKind.ZodCatch:
        current = current._def.innerType;
        break;

      case z.ZodFirstPartyTypeKind.ZodArray:
        current = current._def.type;
        break;

      case z.ZodFirstPartyTypeKind.ZodBranded:
        current = current._def.type;
        break;

      case z.ZodFirstPartyTypeKind.ZodPipeline:
        current = current._def.out;
        break;

      // Các schema do .omit() / .pick() trả về
      case z.ZodFirstPartyTypeKind.ZodObject:
        return current;

      default:
        return current;
    }
  }
}

/**
 * Convert ZodObject -> Prisma select
 */
export function zodToPrismaSelect(schema: z.ZodTypeAny) {
  const unwrapped = unwrapZod(schema);
  if (unwrapped._def?.typeName !== 'ZodObject') {
    throw new Error('Schema must be a ZodObject');
  }
  const shape = unwrapped._def.shape();
  return Object.entries(shape).reduce(
    (select, [key, value]) => {
      const valUnwrapped = unwrapZod(value as z.ZodTypeAny); // cast về ZodTypeAny
      if (valUnwrapped._def?.typeName === 'ZodObject') {
        select[key] = { select: zodToPrismaSelect(valUnwrapped) };
      } else {
        select[key] = true;
      }
      return select;
    },
    {} as Record<string, any>,
  );
}
