import { Matches } from 'class-validator';
import { timestampRegex } from '../../validation';

export class SumRequestsQueryDto {
  @Matches(timestampRegex)
  from?: string;
  @Matches(timestampRegex)
  to?: string;
}
