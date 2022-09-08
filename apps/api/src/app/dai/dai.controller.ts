import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DaiService } from './dai.service';
import { ApiKeyGuard } from '../api-keys/guards/api-key.guard';
import { ApiKeyThrottlerGuard } from '../api-keys/guards/api-key-throttler.guard';
import { GetDaiTransactionsQueryDto } from './dto';
import { ApiLogInterceptor } from '../interceptors';

@UseGuards(ApiKeyGuard, ApiKeyThrottlerGuard)
@UseInterceptors(ApiLogInterceptor)
@Controller('dai')
export class DaiController {
  constructor(private readonly daiService: DaiService) {}

  @Get('transactions')
  async getDaiTransactions(
    @Query() { timestamp, limit }: GetDaiTransactionsQueryDto
  ) {
    return await this.daiService.getDaiTransactions({ timestamp, limit });
  }

  @Get('transactions/:address')
  async getDaiTransactionsByAddress(
    @Query() { timestamp, limit }: GetDaiTransactionsQueryDto,
    @Param('address') address
  ) {
    return await this.daiService.getDaiTransactionsByAddress({
      address,
      timestamp,
      limit,
    });
  }

  @Get('balance/:address')
  async getDaiBalance(@Param('address') address) {
    return await this.daiService.getDaiBalance(address);
  }
}
