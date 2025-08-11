import {
  PayloadAccessTokenTypeCreate,
  PayloadRefreshTokenTypeCreate,
} from '../libs/token/token.service';

export interface AccessTokenPayload extends PayloadAccessTokenTypeCreate {
  exp: number;
  iat: number;
}

export interface RefreshTokenPayload extends PayloadRefreshTokenTypeCreate {
  exp: number;
  iat: number;
}
