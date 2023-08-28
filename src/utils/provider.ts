'use client';
import { ethers } from 'ethers';
import { NEXT_PUBLIC_ALCHEMY_API_TESTNET } from './config';

/**
 * @dev Function provides access to ethereum node
 * @returns
 */
export const ethProvider = () => {
  let provider;

  try {
    if (process.env.NODE_ENV !== 'production') {
      provider = new ethers.providers.JsonRpcProvider();
    } else {
      provider = ethers.getDefaultProvider(NEXT_PUBLIC_ALCHEMY_API_TESTNET);
    }

    return provider;
  } catch (err: any) {
    throw Error(err.message);
  }
};
