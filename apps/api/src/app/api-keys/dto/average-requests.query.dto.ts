import { Matches } from 'class-validator';
import { timestampRegex } from '../../validation';

export class AverageRequestsQueryDto {
  @Matches(timestampRegex)
  from?: string;
  @Matches(timestampRegex)
  to?: string;
}
