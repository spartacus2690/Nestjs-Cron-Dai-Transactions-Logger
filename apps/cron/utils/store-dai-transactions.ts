import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../../.env' });
import {
  createPool,
  DAI_CONTRACT_ADDRESS,
  DaiBalanceModel,
  DaiTransactionModel,
  getAlchemyInstance,
  getDaiContractInstance,
} from '@dai-cron-api/shared';
import * as _ from 'lodash/fp';
import { Model, transaction } from 'objection';
import { getNextFromBlock } from '../utils';
import { AssetTransfersCategory, toHex, fromHex } from 'alchemy-sdk';

const pool = createPool();

Model.knex(pool);

export const storeDaiTransactions = async (fetchLatestBlock: boolean) => {
  try {
    const daiContract = getDaiContractInstance(process.env.ALCHEMY_API_KEY);
    const alchemy = getAlchemyInstance(process.env.ALCHEMY_API_KEY);
    const lastFromBlock = await getNextFromBlock();

    if (fetchLatestBlock) {
      const latestBlock = await alchemy.core.getBlockNumber();
      if (latestBlock - fromHex(lastFromBlock) < 500) {
        fetchLatestBlock = false;
      }
    }

    type TNewTransfer = {
      blockNum: string;
      uniqueId: string;
      hash: string;
      from: string;
      to: string;
      value: number;
      erc721TokenId: string | null;
      erc1155Metadata: Record<string, unknown> | null;
      tokenId: string | null;
      asset: string;
      category: string;
      rawContract: Record<string, unknown>;
      metadata: Record<string, unknown>;
    };

    const newTransfers: Array<Array<TNewTransfer>> = [];
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
      newTransfers.push(
        _.get('transfers', result) as unknown as Array<TNewTransfer>
      );
    } while (pageKey);
    const transfers = _.flow(
      _.flatten,
      _.uniqBy(({ hash }: { hash: string }) => hash),
      _.filter(
        ({ blockNum }: Record<string, unknown>) => blockNum !== lastFromBlock
      ),
      _.map(
        ({
          hash,
          from,
          to,
          rawContract: { value },
          blockNum,
          metadata: { blockTimestamp },
        }: TNewTransfer) => ({
          hash,
          from,
          to,
          value,
          block_num: parseInt(blockNum, 16),
          block_timestamp: blockTimestamp,
        })
      )
    )(newTransfers);

    if (_.size(transfers)) {
      await transaction(
        DaiTransactionModel,
        DaiBalanceModel,
        async (daiTransactionTx, daiBalanceTx) => {
          await daiTransactionTx.query().insert(transfers);

          if (!fetchLatestBlock) {
            const addresses = _.flow(
              _.map(({ to, from }) => [to, from]),
              _.flatten,
              _.uniq
            )(transfers);

            const daiBalances: Array<{ address: string; balance: string }> =
              await Promise.all(
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
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
