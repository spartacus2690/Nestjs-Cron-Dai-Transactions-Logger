import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash/fp';

@Injectable()
export class ApiKeyThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    return _.get('headers.api-key', req);
  }
}
