import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ApiKeysService } from '../api-keys.service';
import * as _ from 'lodash/fp';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(ApiKeysService) private readonly apiKeysService: ApiKeysService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = _.get('headers.api-key', request);
    if (!apiKey) {
      return false;
    }
    return await this.apiKeysService.checkApiKey(apiKey);
  }
}
