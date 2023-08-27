'use client';
import { ethers } from 'ethers';

/**
 * @dev Function provides access to ethereum node
 * @returns
 */
export const ethProvider = () => {
  let provider = new ethers.providers.JsonRpcProvider();

  // if (window.navigator.onLine) {
  //   provider = new ethers.providers.JsonRpcProvider(providerURL);
  // } else {
  //   provider = ethers.getDefaultProvider();
  // }

  return provider;
};
