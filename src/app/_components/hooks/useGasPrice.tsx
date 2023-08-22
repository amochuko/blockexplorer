'use client';

import { ethProvider } from '@/utils/provider';
import { useCallback, useEffect, useState } from 'react';

/**
 * @dev The function get the average gas price
 * @returns gasPrice in Gwei
 */

export const useGasPrice = () => {
  const [gasPrice, setGasPrice] = useState<any>(0);
  const provider = ethProvider();

  const gPrice = useCallback(async () => {
    const blkNum = await provider.getBlockNumber();
    const block = await provider.getBlock(blkNum);
    const fee = block.baseFeePerGas?.toString();

    setGasPrice(fee);
  }, [provider]);

  useEffect(() => {
    gPrice();
  }, [gPrice]);

  return {
    gasPrice,
  };
};
