import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../../.env' });
import * as _ from 'lodash/fp';
import { toHex } from 'alchemy-sdk';
import { createPool, DaiTransactionModel } from '@dai-cron-api/shared';
import { Model } from 'objection';

const pool = createPool();

Model.knex(pool);

const STARTING_BLOCK_NUMBER = parseInt(process.env.STARTING_BLOCK_NUMBER, 10);

export const getNextFromBlock = async () => {
  const max = _.get(
    'max',
    await DaiTransactionModel.query().max('block_num').first()
  );
  return max ? toHex(max) : toHex(STARTING_BLOCK_NUMBER);
};
