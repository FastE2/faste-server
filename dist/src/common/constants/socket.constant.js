"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WS_ROOM_PREFIX = exports.WS_EVENT = exports.WS_NAMESPACE = void 0;
exports.WS_NAMESPACE = {
    PAYMENT: 'payment',
    CHAT: 'chat',
};
exports.WS_EVENT = {
    PAYMENT: {
        PAYMENT: 'payment',
        SEND: 'send-payment',
        RECEIVE: 'receive-payment',
    },
    CHAT: {
        SEND_MESSAGE: 'chat-send-message',
        RECEIVE_MESSAGE: 'chat-receive-message',
        USER_TYPING: 'chat-user-typing',
    },
    NOTIFICATION: {
        NEW: 'notification-new',
        READ: 'notification-read',
    },
};
exports.WS_ROOM_PREFIX = {
    USER: 'user_',
    ORDER: 'order_',
};
//# sourceMappingURL=socket.constant.js.map