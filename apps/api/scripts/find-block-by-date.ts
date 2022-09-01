require('dotenv').config({ path: __dirname + '../../../.env' });
import { Alchemy, Network } from 'alchemy-sdk';
import dayjs from 'dayjs';

const dateArgRegex = /--date=(?<dateArg>[0-9]{2}-[0-9]{2}-[0-9]{4})/;
const initialDecrementArgRegex = /--decrement=(?<decrementArg>[0-9]+)/;

const dateArgMatch = process.argv
  .slice(2)
  .find((arg) => arg.match(dateArgRegex));
const decrementArgMatch = process.argv
  .slice(2)
  .find((arg) => arg.match(initialDecrementArgRegex));

if (!dateArgMatch) {
  throw Error(
    'Must pass --date flag in MM-DD-YYYY format .eg --date=07-20-2022'
  );
}
if (!decrementArgMatch) {
  throw Error(
    `Must pass --decrement flag  for initial block decrement count to speed
     up or slow down finding block e.g. --decrement=5000`
  );
}

const alchemyConfig = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const {
  groups: { dateArg },
} = dateArgMatch.match(dateArgRegex);
const {
  groups: { decrementArg },
} = decrementArgMatch.match(initialDecrementArgRegex);

const alchemy = new Alchemy(alchemyConfig);

(async () => {
  let block = await alchemy.core.getBlockNumber();
  const startDate = dayjs(dateArg, 'MM-DD-YYYY');
  let lastTime = dayjs();

  const getCloserToDesiredBlock = async (inc: number) => {
    if (inc === 0) {
      return;
    }
    if (inc > 0) {
      while (lastTime.isBefore(startDate)) {
        const { timestamp } = await alchemy.core.getBlock(block);
        block += inc;
        lastTime = dayjs.unix(timestamp);
      }
    } else {
      while (lastTime.isAfter(startDate)) {
        const { timestamp } = await alchemy.core.getBlock(block);
        block += inc;
        lastTime = dayjs.unix(timestamp);
      }
    }
    console.log(
      `Getting closer! When inc/dec value is 0 we're done :) Currently: ${Math.abs(
        inc
      )}`
    );
    await getCloserToDesiredBlock(-parseInt(`${inc / 2}`));
  };

  await getCloserToDesiredBlock(-parseInt(decrementArg));
  console.log(`First block for date ${dateArg} is ${block}.`);
})();
