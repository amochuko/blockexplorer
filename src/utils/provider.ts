'use client';
import { ethers } from 'ethers';

/**
 * @dev Function provides access to ethereum node
 * @returns
 */
export const ethProvider = () => {
  let provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');

  // if (window.navigator.onLine) {
  //   provider = new ethers.providers.JsonRpcProvider(providerURL);
  // } else {
  //   provider = ethers.getDefaultProvider();
  // }

  return provider;
};
