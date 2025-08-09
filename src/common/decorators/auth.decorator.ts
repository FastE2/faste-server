import { SetMetadata } from '@nestjs/common';
import { AUTH_NOT_REQUIRED } from '../constants/auth.constant';

export const Ispublic = () => SetMetadata(AUTH_NOT_REQUIRED, true);
