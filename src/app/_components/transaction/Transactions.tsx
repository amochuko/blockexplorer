'use client';

import { timeAgo, truncateHexString, weiToEther } from '@/utils/lib';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Block } from '@ethersproject/providers';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from '../hoc/error-boundary';
import { useEthProvider } from '../hooks/useEthProvider';
import { ToolTip } from '../tool-tip/tooltip';
import './transaction.scss';

interface BlockWithTransactionsProps {
  block: Block | undefined;
}

export function BlockTransactions(props: BlockWithTransactionsProps) {
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
    } catch (err:any) {
      setError(err.message)
    }
  
  }, [props.block?.transactions]);

  return (
    <ErrorBoundary>
      <div className='latest-trasactions'>
        {error.message ? (
          <p>{error.message}</p>
        ) : (
          <>
            <div className='header'>
              <h3>Latest Transactions</h3>
            </div>
            <div className='body'>
              <ul className='unordered-list'>
                {blockTransactions.length > 0 &&
                  blockTransactions
                    ?.filter((_, i) => i <= 3)
                    .map((txn, i) => (
                      <li
                        key={txn.blockNumber! * Math.random() + i}
                        className='list'
                      >
                        <div className='first-block'>
                          <div className='icon'>🧱</div>
                          <span className='title'>Txn#: </span>
                          <Link className='links' href={`tx/${txn.hash}`}>
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
                            <span className='value'>
                              {weiToEther(txn.value)} Eth
                            </span>
                          </ToolTip>
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
            <div className='footer'>
              <div>
                <Link href={'/txs'}>View all Transactions -&gt;</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
