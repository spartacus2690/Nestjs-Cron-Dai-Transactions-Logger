import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AverageRequestsQueryDto } from './dto/average-requests.query.dto';
import { SumRequestsQueryDto } from './dto/sum-requests.query.dto';
import * as _ from 'lodash/fp';

@Injectable()
export class ApiKeysService {
  constructor(
    @Inject('ApiKeyModel') private apiKeyModel,
    @Inject('KnexConnection') private knex
  ) {}

  async createNewApiKey(): Promise<string> {
    return await this.apiKeyModel.query().insert({});
  }

  async checkApiKey(api_key: string): Promise<boolean> {
    const apiKey = await this.apiKeyModel.query().findById(api_key);
    return !!apiKey;
  }

  //avg number of requests per specific timeframe
  async averageNumberOfRequests({ from, to }: AverageRequestsQueryDto) {
    const result = await this.knex.raw(
      `select avg(count) as average_num_requests 
       from(select api_key, count (api_key) as count
       from api_request_logs where api_request_logs.timestamp
       between '${from}' and '${to}'
       group by api_key) sub;`
    );
    return _.first(_.get('rows', result));
  }

  //sum of all requests in a specific time frame
  async sumOfRequests({ from, to }: SumRequestsQueryDto) {
    const result = await this.knex.raw(
      `select count(id) as sum from api_request_logs
        where api_request_logs.timestamp
        between '${from}' and '${to}';`
    );
    return _.first(_.get('rows', result));
  }

  //3 hour time period for specific api key, when the usage is the highest (Example: 3:00pm to 6:00pm)
  async getHighest3HourApiKeyUsage(api_key: string): Promise<{
    api_key: string;
    date: string;
    time_period: string;
    requests: string;
  }> {
    const found = await this.apiKeyModel.query().findById(api_key);
    if (!found) {
      throw new NotFoundException(`API KEY ${api_key} not found.`);
    }
    const result = await this.knex.raw(
      `select
         sub.api_key,
        start::date as date,
        to_char(start::timestamp, 'HH12:MI:SS PM') || 
        ' - ' || 
        to_char(start::timestamp + interval '3 hours', 'HH12:MI:SS PM') as time_period,
        sub.requests
        FROM (
              select
              arl.api_key,
              date_trunc('hour', arl.timestamp) as start,
              COUNT(DISTINCT arl.id) as requests
              FROM api_request_logs as arl
              where arl.api_key = '${api_key}'
              GROUP BY 1, 2
              order by 3 desc
              limit 1
        ) sub`
    );
    return _.first(_.get('rows', result));
  }

  //most used api key (with num of req)
  async getMostUsedApiKey(): Promise<{ api_key: string; requests: string }> {
    const result = await this.knex.raw(
      `select api_key, count(api_key) as requests from api_request_logs
         group by api_key order by requests desc limit 1;`
    );
    return _.first(_.get('rows', result));
  }
}
