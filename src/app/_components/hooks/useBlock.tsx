'use client';
import { timeAgo } from '@/utils/lib';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Block, JsonRpcProvider } from '@ethersproject/providers';
import { useCallback, useEffect, useState } from 'react';
import { useProvider } from './useProvider';

export function useBlock(blkNumber?: number) {
  const [block, setBlock] = useState<Block>();
  const [error, setError] = useState<any>({});
  const [pendingTxns, setPendingTxns] = useState(0);
  const [networkUtilization, setNetworkUtilization] = useState(0);
  const [finalizedBlock, setFinalizedBlock] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);
  const [blockLatest, setBlockLatest] = useState<Block>();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [blockTransactions, setBlockTransactions] = useState<
    TransactionResponse[]
  >([]);
  const provider = useProvider();

  const getBlockByNumber = useCallback(
    async (blkNumber: number | string) => {
      try {
        console.log('blkNumber: ', blkNumber);

        return await provider.getBlock(blkNumber);
      } catch (err: any) {
        setError(err);
      }
    },
    [provider]
  );

  const pendingTx = useCallback(async () => {
    const pendingBlk = await provider.getBlock('pending');
    setPendingTxns(pendingBlk.transactions.length);
  }, []);

  const finalizedBlk = useCallback(async () => {
    const fBlk = await provider.getBlock('finalized');
    setFinalizedBlock(fBlk.number);
  }, []);

  const getLatestBlock = useCallback(async () => {
    const res = await provider.getBlock('latest');
    setBlockLatest(res);
  }, [provider]);

  const setBlockEvent = useCallback(async (num: number) => {
    try {
      const blk = await provider.getBlock(num);
      setBlocks((prevBlk) => [...prevBlk!, blk]);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const getNetworkUtilization = useCallback(async () => {
    // TODO: Get Newtork performance
    try {
      // const blk = await provider(num);
      setNetworkUtilization(0);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const getBlockTime = async (blockHash: any) => {
    const blk = await provider.getBlock(blockHash);
    const t = timeAgo(blk.timestamp);
    setTimeStamp(blk.timestamp);
  };

  // subscribe to block event
  const subscribeToBlocks = useCallback(() => {
    provider.on('block', setBlockEvent);
  }, [setBlockEvent]);

  // unsubscribe to block event
  const unsubscribeToBlocks = useCallback(() => {
    provider.off('block', setBlockEvent);
  }, [setBlockEvent]);

  useEffect(() => {
    subscribeToBlocks();

    return () => {
      // clean up
      unsubscribeToBlocks();
    };
  }, [blocks, setBlockEvent, subscribeToBlocks, unsubscribeToBlocks]);

  useEffect(() => {
    pendingTx();
    finalizedBlk();
    getLatestBlock();
    getNetworkUtilization();
  }, []);

  useEffect(() => {
    try {
      block?.transactions.map(async (hash) => {
        const tnxs = await provider.getTransaction(hash);
        setBlockTransactions((prevTxn) => [...prevTxn, tnxs]);
      });
    } catch (err: any) {
      setError(err.message);
    }
  }, [block?.transactions]);

  return {
    block,
    blocks,
    getBlockByNumber,
    blockTransactions,
    error,
    pendingTxns,
    finalizedBlock,
    blockLatest,
    timeStamp,
    networkUtilization,
  };
}

async function getBlock(
  args: 'pending' | 'finalized' | 'latest' | 'number',
  provider: JsonRpcProvider
) {
  try {
    return await provider.getBlock(args);
  } catch (err: any) {
    throw err.message;
  }
}
