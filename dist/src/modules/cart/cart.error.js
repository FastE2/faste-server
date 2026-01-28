"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityQuantitySKUInValidException = void 0;
const common_1 = require("@nestjs/common");
exports.UnprocessableEntityQuantitySKUInValidException = new common_1.UnprocessableEntityException({
    message: 'Error.QuantitySKUInvalid',
    path: 'quantity',
});
//# sourceMappingURL=cart.error.js.map