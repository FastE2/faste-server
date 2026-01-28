"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const crypto_1 = require("crypto");
const generateOTP = () => {
    const otp = (0, crypto_1.randomInt)(100000, 1000000);
    return otp.toString();
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=generate-otp.util.js.map