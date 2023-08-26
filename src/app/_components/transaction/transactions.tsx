'use client';

import { getTxnFee, timeAgo, truncateHexString, weiToEther } from '@/utils/lib';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from '../hoc/error-boundary';
import { useBlock } from '../hooks/useBlock';
import { useEthProvider } from '../hooks/useEthProvider';
import './transactions.scss';

export function Transactions() {
  //   const { blocks } = useBlocks();
  const { blocks, pendingTxns } = useBlock();
  const [txnHash, setTxnHash] = useState<string[]>([]);
  const [txnResponse, setTxnResponse] = useState<TransactionResponse[]>([]);
  const provider = useEthProvider();

  const setTransactionHash = useCallback(async () => {
    for (let i = 0; i < blocks.length; i++) {
      setTxnHash(blocks[i].transactions);
    }
  }, [blocks]);

  useEffect(() => {
    setTransactionHash();
  }, [setTransactionHash]);

  const getTransactions = useCallback(async () => {
    txnHash.forEach(async (hash) => {
      const txn = await provider.getTransaction(hash);
      setTxnResponse((txnResp) => [...txnResp, txn]);
    });
  }, [txnHash]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <ErrorBoundary>
      <div className='transaction'>
        <div className='main'>
          <div className='info'>
            <h3>More than {txnHash.length} txns found</h3>
            <p>(Showing the last n records)</p>
          </div>
          {/* TODO: Add Pagination here */}
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  {[
                    'Txn Hash',
                    'Block',
                    'Age',
                    'From',
                    'To',
                    'Value',
                    'Txn Fee',
                  ].map((itm, i) => (
                    <th key={i}>{itm}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {txnResponse.map((txn, i) => (
                  <tr key={i}>
                    <td>
                      <span>
                        <Link className='link' href={`/txns/${txn.hash}`}>
                          {truncateHexString({
                            hexString: txn.hash,
                            isEthAddress: false,
                            letterCount: 18,
                            positon: 'end',
                          })}
                        </Link>
                      </span>
                    </td>
                    <td>
                      <span>{txn.blockNumber}</span>
                    </td>
                    <td>
                      <span>{timeAgo(txn.timestamp)}</span>
                    </td>
                    <td>
                      <span>
                        <Link className='link' href={`/address/${txn.from}`}>
                          {truncateHexString({
                            hexString: txn.from,
                            isEthAddress: false,
                            letterCount: 8,
                            positon: 'middle',
                          })}
                        </Link>
                      </span>
                    </td>
                    <td>
                      <Link className='link' href={`/address/${txn.to}`}>
                        {truncateHexString({
                          hexString: String(txn.to),
                          isEthAddress: false,
                          letterCount: 8,
                          positon: 'middle',
                        })}
                      </Link>
                    </td>
                    <td>
                      <span>
                        {weiToEther({ wei: txn.value, fractionDigits: 4 })}
                      </span>
                    </td>
                    <td>
                      <span>
                        {getTxnFee(
                          txn.gasLimit,
                          txn.gasPrice!,
                          txn.maxPriorityFeePerGas!
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
