'use client';

import { timeAgo, truncateHexString, weiToEther } from '@/utils/lib';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Block } from '@ethersproject/providers';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from '../../hoc/error-boundary';
import { useEthProvider } from '../../hooks/useEthProvider';
import { ToolTip } from '../../tool-tip/tooltip';
import './latest-transactions.scss';

interface BlockWithTransactionsProps {
  block: Block | undefined;
  limit?: number;
}

export function LatestTransactions(props: BlockWithTransactionsProps) {
  const [blockTransactions, setBlockTransactions] = useState<
    TransactionResponse[]
  >([]);

  const provider = useEthProvider();
  const [error, setError] = useState<any>({});

  useEffect(() => {
    try {
      props.block?.transactions.map(async (hash) => {
        const tnxs = await provider.getTransaction(hash);
        setBlockTransactions((prevTxn) => [...prevTxn, tnxs]);
      });
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Loading txn list</p>}>
        <div className='latest-trasactions'>
          {error.message ? (
            <p>{error.message}</p>
          ) : (
            <>
              <div className='header-block'>
                <h3>Latest Transactions</h3>
              </div>
              <div className='body'>
                <ul className='list'>
                  {blockTransactions.length > 0 &&
                    blockTransactions
                      ?.filter((_, i) => i < props.limit!)
                      .map((txn, i) => (
                        <li
                          key={txn.blockNumber! * Math.random() + i}
                          className='item'
                        >
                          <div className='first-block'>
                            <div className='icon'>❒</div>
                            <span className='title'>Txn#:</span>
                            <Link className='links' href={`txns/${txn.hash}`}>
                              {'  '}
                              {truncateHexString({
                                hexString: txn.hash,
                                letterCount: 14,
                                positon: 'end',
                                isEthAddress: false,
                              })}
                            </Link>{' '}
                            <span className='time'>
                              {timeAgo(txn.timestamp)} secs ago
                            </span>
                          </div>
                          <div className='second-block'>
                            <p className='text'>
                              <span className='title'> From: </span>
                              <Link
                                className='links'
                                href={`/address/${txn.from}`}
                              >
                                {truncateHexString({
                                  hexString: txn.from,
                                  letterCount: 8,
                                  positon: 'middle',
                                  isEthAddress: true,
                                })}
                              </Link>
                            </p>
                          </div>
                          <div className='third-block'>
                            <span className='title'>To:</span>
                            <Link className='links' href={`/address/${txn.to}`}>
                              {truncateHexString({
                                hexString: txn.to!,
                                letterCount: 8,
                                positon: 'middle',
                                isEthAddress: true,
                              })}
                            </Link>{' '}
                            <ToolTip title='Amount'>
                              <span className='tx_value'>
                                {weiToEther({ wei: txn.value })} Eth
                              </span>
                            </ToolTip>
                          </div>
                        </li>
                      ))}
                </ul>
              </div>
              <div className='footer-block'>
                <Link href={'/txns'}>View all Transactions →</Link>
              </div>
            </>
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
