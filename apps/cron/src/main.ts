import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../../.env' });
import cron from 'node-cron';
import { storeDaiTransactions } from '../utils';

(async () => {
  let fetchLatestBlock = true;
  while (fetchLatestBlock) {
    fetchLatestBlock = await storeDaiTransactions(fetchLatestBlock);
  }

  cron.schedule('15 * * * * *', async () => {
    await storeDaiTransactions(false);
  });
})();
