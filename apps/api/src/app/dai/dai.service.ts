import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GetDaiTransactionsQueryDto } from './dto/get-dai-transactions.query.dto';
import * as _ from 'lodash/fp';
import { ConfigService } from '@nestjs/config';
import { getDaiContractInstance } from '@dai-cron-api/shared';

type TDaiTransaction = {
  hash: string;
  from: string;
  to: string;
  value: string;
  block_num: number;
  block_timestamp: string;
};

@Injectable()
export class DaiService {
  constructor(
    @Inject('DaiTransactionModel') private daiTransactionModel,
    @Inject('DaiBalanceModel') private daiBalanceModel,
    @Inject('KnexConnection') private knex,
    private readonly config: ConfigService
  ) {}

  async getDaiTransactions({
    timestamp,
    limit,
  }: GetDaiTransactionsQueryDto): Promise<{
    results: Array<TDaiTransaction>;
    lastTimestamp: string;
  }> {
    let promise = this.daiTransactionModel
      .query()
      .orderBy('block_timestamp', 'desc')
      .limit(limit ? parseInt(limit, 10) : 100);
    if (timestamp) {
      promise = promise.where('block_timestamp', '<', timestamp);
    }
    const results = await promise;
    const lastTimestamp = _.get('block_timestamp', _.last(results));
    return { results, lastTimestamp };
  }

  async getDaiTransactionsByAddress({
    address,
    timestamp,
    limit,
  }: GetDaiTransactionsQueryDto & { address: string }): Promise<{
    results: Array<TDaiTransaction>;
    lastTimestamp: string;
  }> {
    let promise = this.daiTransactionModel
      .query()
      .where({ from: address })
      .orWhere({ to: address })
      .orderBy('block_timestamp', 'desc')
      .limit(limit ? parseInt(limit, 10) : 100);
    if (timestamp) {
      promise = promise.andWhere('block_timestamp', '<=', timestamp);
    }
    const results = await promise;
    const lastTimestamp = _.get('block_timestamp', _.last(results));
    return { results, lastTimestamp };
  }

  async getDaiBalance(
    address: string
  ): Promise<{ address: string; balance: string }> {
    const balance = _.get(
      'balance',
      await this.daiBalanceModel.query().findById(address).select('balance')
    );
    if (!balance) {
      const daiContract = getDaiContractInstance(
        this.config.get('ALCHEMY_API_KEY')
      );
      const fetchedBalance = (await daiContract.balanceOf(address)).toString();

      await this.daiBalanceModel
        .query()
        .insert({ address, balance: fetchedBalance });
      return { address, balance: fetchedBalance };
    }
    return { address, balance };
  }
}
