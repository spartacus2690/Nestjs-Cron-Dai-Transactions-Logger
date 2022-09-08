import { ethers } from 'ethers';
import { DAI_ABI } from '../abi';
import { DAI_CONTRACT_ADDRESS } from '../shared';
import { Alchemy, Network } from 'alchemy-sdk';

export const getDaiContractInstance = (alchemyApiKey: string) => {
  const alchemyProvider = new ethers.providers.AlchemyProvider(
    'mainnet',
    alchemyApiKey
  );
  const DaiInterface = new ethers.utils.Interface(DAI_ABI);
  return new ethers.Contract(
    DAI_CONTRACT_ADDRESS,
    DaiInterface,
    alchemyProvider
  );
};

export const getAlchemyInstance = (alchemyApiKey: string) => {
  const alchemyConfig = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  return new Alchemy(alchemyConfig);
};
