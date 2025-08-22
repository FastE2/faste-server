import { ProductTranslationType } from './common/models/product-translation.model';
import { VariantsType } from './common/models/product.model';

declare global {
  namespace PrismaJson {
    type Variants = VariantsType;
  }
}
