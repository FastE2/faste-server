import { SetMetadata } from '@nestjs/common';

export const PAYMENT_API_KEY = 'PAYMENT_API_KEY';
export const PaymentAPIKey = () => SetMetadata(PAYMENT_API_KEY, true);
