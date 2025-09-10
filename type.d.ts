import { DivisionRecord } from 'src/common/types/address-ship.type';
import { ProductTranslationType } from './common/models/product-translation.model';
import { VariantsType } from './common/models/product.model';

export interface AddressFieldDescriptor {
  key: string; // ví dụ: "houseNumber", "street", "ward", "district", "city", "state", "postcode"
  label?: string; // nhãn hiển thị (có thể đa ngôn ngữ)
  required?: boolean; // có bắt buộc hay không
  order?: number; // thứ tự hiển thị
  example?: string;
  maxLength?: number;
  regex?: string; // optional: dùng để validate (ví dụ zipcode)
}
declare global {
  namespace PrismaJson {
    type Variants = VariantsType;
    type ProductTranslations = Pick<
      ProductTranslationType,
      'id' | 'name' | 'description' | 'languageId'
    >[];
    type AttributesType = Record<string, string>;

    type Geoinfo = {
      region: {
        latitude: number;
        longitude: number;
      };
      user_adjusted?: boolean; // user có chỉnh sửa thủ công không
      user_verified?: boolean; // user xác thực đúng chưa
      auto_fill: boolean;
      source?: string; // "google_map" | "openstreet" | ...
      timestamp?: string;
      [key: string]: JsonValue; // cho phép mở rộng
    };

    type AddressFormat = {
      format: string; // ví dụ: "{{houseNumber}} {{street}}, {{district}}, {{city}}, {{state}}, {{country}}"
      postcode?: {
        regex?: string; // regex string for validation
        example?: string;
      } | null;
      fields: AddressFieldDescriptor[];
      example?: string; // ví dụ format
      metadata?: Record<string, any>;
      [key: string]: JsonValue;
    };

    type divisionPath = DivisionRecord;
  }
}
