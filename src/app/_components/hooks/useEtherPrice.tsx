'use client';

import { AggregatorV3InterfaceABI } from '@/abi/aggregatorV3Interface';
import { AggregateContractAddress } from '@/constant';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useProvider } from './useProvider';

/**
 * @dev Use the ETH / USD contract from Chainlink oracle to get the dollar
 * price of Ether
 */

export const useEtherPrice = () => {
  const [ethPrice, setEthPrice] = useState(0);
  const provider = useProvider();

  const getEtherPrice = useCallback(async () => {
    const contract = new ethers.Contract(
      AggregateContractAddress,
      AggregatorV3InterfaceABI,
      provider
    );

    try {
      const [_, answer] = await contract.functions.latestRoundData();
      const decimals = await contract.functions?.decimals();

      const u = (parseInt(answer) / 10 ** decimals).toFixed(2);

      setEthPrice(+u);
    } catch (err: any) {
      console.log(err.message);
    }
  }, [provider]);

  useEffect(() => {
    getEtherPrice();
  }, [getEtherPrice]);

  return {
    ethPrice,
  };
};
