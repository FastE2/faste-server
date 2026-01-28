"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSKUs = generateSKUs;
exports.buildSkuCode = buildSkuCode;
const uuid_1 = require("uuid");
const generate_attributes_helper_1 = require("./generate-attributes.helper");
function generateSKUs(variants) {
    const attributes = (0, generate_attributes_helper_1.generateAttributes)(variants);
    return attributes.map((attributes) => ({
        attributes,
        price: 0,
        quantity: 100,
        image: '',
    }));
}
function buildSkuCode(attributes) {
    const prefix = (0, uuid_1.v4)().split('-')[0].slice(0, 4);
    const attributeValue = Object.values(attributes)
        .map((val) => val
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D'))
        .join('-');
    return `${prefix}-${attributeValue}`.toUpperCase();
}
//# sourceMappingURL=generate-skus.helper.js.map