import { IsOptional, IsString, Matches } from 'class-validator';
import { timestampRegex } from '../../validation';

export class GetDaiTransactionsQueryDto {
  @Matches(timestampRegex)
  @IsOptional()
  timestamp?: string;
  @IsString()
  @IsOptional()
  limit?: string;
}
