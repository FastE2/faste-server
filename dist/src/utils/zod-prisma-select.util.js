"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodToPrismaSelect = zodToPrismaSelect;
const zod_1 = require("zod");
function unwrapZod(schema) {
    let current = schema;
    while (true) {
        const typeName = current._def.typeName;
        switch (typeName) {
            case zod_1.z.ZodFirstPartyTypeKind.ZodOptional:
            case zod_1.z.ZodFirstPartyTypeKind.ZodNullable:
            case zod_1.z.ZodFirstPartyTypeKind.ZodDefault:
            case zod_1.z.ZodFirstPartyTypeKind.ZodEffects:
            case zod_1.z.ZodFirstPartyTypeKind.ZodCatch:
                current = current._def.innerType;
                break;
            case zod_1.z.ZodFirstPartyTypeKind.ZodArray:
                current = current._def.type;
                break;
            case zod_1.z.ZodFirstPartyTypeKind.ZodBranded:
                current = current._def.type;
                break;
            case zod_1.z.ZodFirstPartyTypeKind.ZodPipeline:
                current = current._def.out;
                break;
            case zod_1.z.ZodFirstPartyTypeKind.ZodObject:
                return current;
            default:
                return current;
        }
    }
}
function zodToPrismaSelect(schema) {
    const unwrapped = unwrapZod(schema);
    if (unwrapped._def?.typeName !== 'ZodObject') {
        throw new Error('Schema must be a ZodObject');
    }
    const shape = unwrapped._def.shape();
    return Object.entries(shape).reduce((select, [key, value]) => {
        const valUnwrapped = unwrapZod(value);
        if (valUnwrapped._def?.typeName === 'ZodObject') {
            select[key] = { select: zodToPrismaSelect(valUnwrapped) };
        }
        else {
            select[key] = true;
        }
        return select;
    }, {});
}
//# sourceMappingURL=zod-prisma-select.util.js.map