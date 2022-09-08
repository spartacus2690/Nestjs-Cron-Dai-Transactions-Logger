import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { AverageRequestsQueryDto } from './dto/average-requests.query.dto';
import { SumRequestsQueryDto } from './dto/sum-requests.query.dto';
import { isUUID } from '../validation';

@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Get('new')
  async getNewApiKey() {
    return await this.apiKeysService.createNewApiKey();
  }

  @Get('requests/average')
  async getAverageRequests(@Query() { from, to }: AverageRequestsQueryDto) {
    return await this.apiKeysService.averageNumberOfRequests({ from, to });
  }

  @Get('requests/sum')
  async getSumOfRequests(@Query() { from, to }: SumRequestsQueryDto) {
    return await this.apiKeysService.sumOfRequests({ from, to });
  }

  @Get('requests/:api_key/highest-3-hours')
  async getHighest3HourApiKeyUsage(@Param('api_key') api_key) {
    if (!isUUID(api_key)) {
      throw new BadRequestException('api_key must be v4 UUID');
    }
    return await this.apiKeysService.getHighest3HourApiKeyUsage(api_key);
  }

  @Get('most-used')
  async getMostUsedApiKey() {
    return await this.apiKeysService.getMostUsedApiKey();
  }
}
