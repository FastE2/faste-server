"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAttributes = generateAttributes;
function generateAttributes(variants) {
    const combine = (variantsLeft, current = {}) => {
        if (variantsLeft.length === 0) {
            return [current];
        }
        const [first, ...rest] = variantsLeft;
        const result = [];
        for (const option of first.options) {
            const next = { ...current, [first.value]: option };
            result.push(...combine(rest, next));
        }
        return result;
    };
    return combine(variants);
}
//# sourceMappingURL=generate-attributes.helper.js.map