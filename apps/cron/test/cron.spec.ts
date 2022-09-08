import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../../.env' });
import { getNextFromBlock, storeDaiTransactions } from '../utils';
import {
  createPool,
  getAlchemyInstance,
  DaiTransactionModel,
} from '@dai-cron-api/shared';
import { fromHex } from 'alchemy-sdk';
import { Model } from 'objection';

const pool = createPool();
Model.knex(pool);

describe('cron', function () {
  beforeEach(async () => {
    await pool.seed.run();
  });

  describe('getNextFromBlock', function () {
    it('gets latest block from db', async () => {
      const { max } = await pool('dai_transactions').max('block_num').first();
      const latestBlock = await getNextFromBlock();
      expect(max).toEqual(fromHex(latestBlock));
    });
  });

  describe('storeDaiTransactions', function () {
    it('when fetchLatestBlock is true, store transactions from next 500 blocks', async () => {
      const { max: maxBlockNumBefore } = await pool('dai_transactions')
        .max('block_num')
        .first();

      const { count: countBefore } = await pool('dai_transactions')
        .count()
        .first();
      await storeDaiTransactions(true);
      const { count: countAfter } = await pool('dai_transactions')
        .count()
        .first();
      expect(parseInt(countAfter as string, 10)).toBeGreaterThan(
        parseInt(countBefore as string, 10)
      );

      const { max: maxBlockNumAfter } = await pool('dai_transactions')
        .max('block_num')
        .first();
      expect(maxBlockNumAfter - maxBlockNumBefore).toEqual(500);
    });

    it('starts storing dai balances when difference between latest block and block in db is less than 1000', async () => {
      const alchemy = getAlchemyInstance(process.env.ALCHEMY_API_KEY);
      const latestBlock = await alchemy.core.getBlockNumber();
      const fakeTransaction = {
        hash: '0xafabfff5ffffffffffffffffffd81b3b6b08e51206424fc615527751f568391',
        from: '0x937a0c4697e5551ba3a50f8beb279ed0a71d08b5',
        to: '0x9008d19f58aabd9ed0d60971565aa8510560ab41',
        value: '0x01c5f05f286f24800000',
        block_num: latestBlock - 50,
        block_timestamp: '2022-09-06T03:59:58.000Z',
      };
      await DaiTransactionModel.query().insert(fakeTransaction);
      const { count: beforeBalanceCount } = await pool('dai_balances')
        .count()
        .first();

      await storeDaiTransactions(false);
      const { count: afterBalanceCount } = await pool('dai_balances')
        .count()
        .first();
      expect(parseInt(afterBalanceCount as string, 10)).toBeGreaterThan(
        parseInt(beforeBalanceCount as string, 10)
      );
    });

    afterAll(async () => {
      await pool.seed.run();
      await pool.destroy();
    });
  });
});
