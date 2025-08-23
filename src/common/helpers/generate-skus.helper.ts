import { v4 as uuidv4 } from 'uuid';
import { VariantsType } from 'src/modules/product/product.schema';
import { generateAttributes } from './generate-attributes.helper';

export function generateSKUs(variants: VariantsType) {
  const attributes = generateAttributes(variants);

  return attributes.map((attributes) => ({
    attributes,
    price: 0,
    quantity: 100,
    image: '',
  }));
}

export function buildSkuCode(attributes: Record<string, string>): string {
  const prefix = uuidv4().split('-')[0].slice(0, 4);

  const attributeValue = Object.values(attributes)
    .map((val) =>
      val
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D'),
    )
    .join('-');

  return `${prefix}-${attributeValue}`.toUpperCase();
}
