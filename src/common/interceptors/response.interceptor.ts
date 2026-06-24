import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    return next.handle().pipe(
      map((response: any) => {
        if (response && response.meta) {
          return {
            success: true,
            data: response.items ?? response.data ?? null,
            meta: response.meta,
            error: null,
          };
        }

        return {
          success: true,
          data: response,
          meta: null,
          error: null,
        };
      }),
    );
  }
}
