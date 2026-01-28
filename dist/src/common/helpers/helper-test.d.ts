import { VariantsType } from 'src/modules/product/product.schema';
export declare function generateAttributes(variants: VariantsType): {
    attributes: Record<string, string>;
    skuCode: string;
    price: number;
    quantity: number;
    image: string;
}[];
