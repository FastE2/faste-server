export const WS_NAMESPACE = {
  PAYMENT: 'payment',
  CHAT: 'chat',
};

export const WS_EVENT = {
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

export const WS_ROOM_PREFIX = {
  USER: 'user_',
  ORDER: 'order_',
};
