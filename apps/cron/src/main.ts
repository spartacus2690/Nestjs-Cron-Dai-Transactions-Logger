import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../../.env' });
import { ethers } from 'ethers';
import {
  Alchemy,
  AssetTransfersCategory,
  Network,
  toHex,
  fromHex,
} from 'alchemy-sdk';
import * as _ from 'lodash/fp';
import { Model, transaction } from 'objection';
import cron from 'node-cron';
import {
  createPool,
  DaiTransactionModel,
  DaiBalanceModel,
} from '@tessera/shared';

import DAI_ABI from '../dai-abi.json';

const pool = createPool();

Model.knex(pool);

const DAI_CONTRACT_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const STARTING_BLOCK_NUMBER = parseInt(process.env.STARTING_BLOCK_NUMBER, 10);

const alchemyProvider = new ethers.providers.AlchemyProvider(
  'mainnet',
  process.env.ALCHEMY_API_KEY
);
const alchemyConfig = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(alchemyConfig);
const DaiInterface = new ethers.utils.Interface(DAI_ABI);
const daiContract = new ethers.Contract(
  DAI_CONTRACT_ADDRESS,
  DaiInterface,
  alchemyProvider
);

const getNextFromBlock = async () => {
  const max = _.get(
    'max',
    await DaiTransactionModel.query().max('blockNum').first()
  );
  return max ? toHex(max) : toHex(STARTING_BLOCK_NUMBER);
};

let lastFromBlock;

const storeDaiTransactions = async (fetchLatestBlock: boolean) => {
  try {
    lastFromBlock = await getNextFromBlock();

    if (fetchLatestBlock) {
      const latestBlock = await alchemy.core.getBlockNumber();
      if (latestBlock - fromHex(lastFromBlock) < 1000) {
        fetchLatestBlock = false;
      }
    }

    let newTransfers = [];
    let pageKey = null;
    do {
      const result = await alchemy.core.getAssetTransfers({
        fromBlock: lastFromBlock,
        toBlock: fetchLatestBlock
          ? toHex(fromHex(lastFromBlock) + 500)
          : 'latest',
        contractAddresses: [DAI_CONTRACT_ADDRESS],
        category: [AssetTransfersCategory.ERC20],
        withMetadata: true,
        pageKey: pageKey || undefined,
      });
      pageKey = _.get('pageKey', result);
      newTransfers.push(_.get('transfers', result));
    } while (pageKey);
    newTransfers = _.flow(
      _.flatten,
      _.uniqBy(({ hash }) => hash),
      _.filter(({ blockNum }) => blockNum !== lastFromBlock),
      _.map(
        ({
          hash,
          from,
          to,
          rawContract: { value },
          blockNum,
          metadata: { blockTimestamp },
        }) => ({
          hash,
          from,
          to,
          value,
          blockNum: parseInt(blockNum, 16),
          blockTimestamp,
        })
      )
    )(newTransfers);

    if (_.size(newTransfers)) {
      await transaction(
        DaiTransactionModel,
        DaiBalanceModel,
        async (daiTransactionTx, daiBalanceTx) => {
          await daiTransactionTx.query().insert(newTransfers);

          if (!fetchLatestBlock) {
            const addresses = _.flow(
              _.map(({ to, from }) => [to, from]),
              _.flatten,
              _.uniq
            )(newTransfers);

            const daiBalances = await Promise.all(
              _.map(
                async (address) => ({
                  address,
                  balance: (await daiContract.balanceOf(address)).toString(),
                }),
                addresses
              )
            );

            await daiBalanceTx
              .query()
              .upsertGraph(daiBalances, { insertMissing: true });
          }
          console.log(
            `Stored DAI transactions from block ${lastFromBlock} to '${
              fetchLatestBlock ? toHex(fromHex(lastFromBlock) + 500) : 'latest'
            }'`
          );
        }
      );
    }

    return fetchLatestBlock;
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  let fetchLatestBlock = true;
  while (fetchLatestBlock) {
    fetchLatestBlock = await storeDaiTransactions(fetchLatestBlock);
  }

  cron.schedule('15 * * * * *', async () => {
    await storeDaiTransactions(false);
  });
})();
