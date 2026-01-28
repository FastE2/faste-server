"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = void 0;
const normalize = (obj) => JSON.stringify(Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
}, {}));
exports.normalize = normalize;
//# sourceMappingURL=normalize.helper.js.map