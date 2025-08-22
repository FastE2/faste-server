import { VariantsType } from 'src/modules/product/product.schema';

export function generateSKUs(variants: VariantsType) {
  // Sử dụng recursion hoặc reduce để kết hợp các options
  const combineVariants = (
    variants: VariantsType,
    current: string[] = [],
  ): string[] => {
    if (variants.length === 0) {
      return [current.join('-')];
    }
    const [firstVariant, ...restVariants] = variants;
    const result: string[] = [];
    for (const option of firstVariant.options) {
      result.push(...combineVariants(restVariants, [...current, option]));
    }
    return result;
  };

  // Kết hợp các biến thể lại với nhau
  const skuValues = combineVariants(variants);

  // Tạo SKU từ các giá trị đã kết hợp
  return skuValues.map((value) => ({
    name: value,
    price: 0, // Giá mặc định là 0
    quantity: 100, // Số lượng tồn kho mặc định là 100
    image: '', // Hình ảnh mặc định rỗng
  }));
}
