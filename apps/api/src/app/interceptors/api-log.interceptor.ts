import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiRequestLogModel } from '@dai-cron-api/shared';
import * as _ from 'lodash/fp';
import { response } from 'express';

@Injectable()
export class ApiLogInterceptor implements NestInterceptor {
  constructor(@Inject('ApiRequestLogModel') private apiRequestLogModel) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const api_key = _.get('headers.api-key', request);
    const {
      url: original_url,
      params,
      query,
    } = _.pick(['url', 'params', 'query'], request);
    const path = _.get('_parsedUrl.pathname', request);
    const apiLogData = {
      api_key,
      original_url,
      params: JSON.stringify(params),
      query: JSON.stringify(query),
      path,
    };

    return next.handle().pipe(
      tap({
        next: async () => {
          await this.apiRequestLogModel.query().insert(apiLogData);
        },
      })
    );
  }
}
