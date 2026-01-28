import { VariantsType } from 'src/modules/product/product.schema';
export declare function generateSKUs(variants: VariantsType): {
    attributes: Record<string, string>;
    price: number;
    quantity: number;
    image: string;
}[];
export declare function buildSkuCode(attributes: Record<string, string>): string;
