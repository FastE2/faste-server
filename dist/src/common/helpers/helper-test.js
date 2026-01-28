"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAttributes = generateAttributes;
const generate_skus_helper_1 = require("./generate-skus.helper");
function generateAttributes(variants) {
    const combineVariants = (variants) => {
        if (variants.length === 0)
            return [];
        return variants.reduce((acc, variant) => {
            const result = [];
            for (const option of variant.options) {
                if (acc.length === 0) {
                    result.push({ [variant.value]: option });
                }
                else {
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
        const skuCode = (0, generate_skus_helper_1.buildSkuCode)(attributes);
        return {
            attributes,
            skuCode,
            price: 0,
            quantity: 100,
            image: '',
        };
    });
}
//# sourceMappingURL=helper-test.js.map