import { VariantsType } from 'src/modules/product/product.schema';
import { v4 as uuidv4 } from 'uuid';
import { buildSkuCode } from './generate-skus.helper';

export function generateAttributes(variants: VariantsType) {
  const combineVariants = (
    variants: VariantsType,
  ): Record<string, string>[] => {
    if (variants.length === 0) return [];

    return variants.reduce<Record<string, string>[]>((acc, variant) => {
      const result: Record<string, string>[] = [];

      for (const option of variant.options) {
        if (acc.length === 0) {
          // Lần đầu tiên
          result.push({ [variant.value]: option });
        } else {
          // Kết hợp với các attribute trước
          for (const item of acc) {
            result.push({
              ...item,
              [variant.value]: option,
            });
          }
        }
      }

      return result;
    }, []);
  };

  const result = combineVariants(variants);

  return result.map((attributes) => {
    const skuCode = buildSkuCode(attributes);
    return {
      attributes,
      skuCode,
      price: 0,
      quantity: 100,
      image: '',
    };
  });
}
