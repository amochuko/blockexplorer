'use client';
import { ethProvider } from '@/utils/provider';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Block } from '@ethersproject/providers';
import { useCallback, useEffect, useState } from 'react';

interface BlockWithTransactionsProps {
  block: Block | undefined;
}

export function useBlock(blkNumber?: number) {
  const [block, setBlock] = useState<Block>();
  const [error, setError] = useState<any>({});
  const [pendingTxns, setPendingTxns] = useState(0);
  const [finalizedBlock, setFinalizedBlock] = useState(0);
  const [blockTransactions, setBlockTransactions] = useState<
    TransactionResponse[]
  >([]);
  const provider = ethProvider();

  const getBlock = useCallback(
    async (num?: number) => {
      let blk: Block;
      try {
        if (num) {
          blk = await provider.getBlock(num);
        } else {
          num = await provider.getBlockNumber();
          blk = await provider.getBlock(num);
        }

        setBlock(blk);
      } catch (err: any) {
        setError(err);
      }
    },
    [provider]
  );

  const pendingTx = useCallback(async () => {
    const pendingBlk = await provider.getBlock('pending');
    console.log('pendingTxn: ', pendingBlk.transactions.length);
    setPendingTxns(pendingBlk.transactions.length);
  }, []);

  const finalizedBlk = useCallback(async () => {
    const fBlk = await provider.getBlock('final');
    console.log('pendingTxn: ', fBlk);
    setFinalizedBlock(fBlk.number);
  }, []);

  useEffect(() => {
    getBlock();
    pendingTx();
    finalizedBlk();
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
    blockTransactions,
    error,
    pendingTxns,
    finalizedBlock,
  };
}
