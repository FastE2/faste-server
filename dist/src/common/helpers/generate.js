"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRoomUserId = exports.generateCancelPaymentJobId = void 0;
const generateCancelPaymentJobId = (paymentId) => {
    return `paymentId-${paymentId}`;
};
exports.generateCancelPaymentJobId = generateCancelPaymentJobId;
const generateRoomUserId = (userId) => {
    return `userId-${userId}`;
};
exports.generateRoomUserId = generateRoomUserId;
//# sourceMappingURL=generate.js.map