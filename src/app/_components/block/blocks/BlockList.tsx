'use client';

import {
  calculateBurntFee,
  calculateMinerReward,
  calculatePercentGasUsage,
  timeAgo,
  truncateHexString,
} from '@/utils/lib';
import { Block } from '@ethersproject/providers';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from '../../hoc/error-boundary';
import './blockList.scss';
import { Fallback } from '../../feedback/fallback';

interface BlockListProps {
  blocks: Block[];
}
export const BlockList = (props: BlockListProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Fallback title='Loading block list' />}>
        <div className='blocks'>
          <div className='main'>
            <div className='info'>
              <h3 className='headTitle'>
                Total of {props.blocks.length} blocks
              </h3>
              <p className='subTitle'>
                (Showing blocks between #{''} to #{''})
              </p>
            </div>
            {/* TODO: Add Pagination here */}
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    {[
                      'Block',
                      'Age',
                      'Txn',
                      'Fee Recipient',
                      'Gas Used',
                      'Gas Limit',
                      'Base Fee',
                      'Reward',
                      'Burnt Fees (ETH)',
                    ].map((itm, i) => (
                      <th key={i} className='header'>
                        <p className='title'>{itm}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {props.blocks.map((blk, i) => (
                    <tr key={i}>
                      <td>
                        <p>
                          <Link className='link' href={`/block/${blk.number}`}>
                            {blk.number}
                          </Link>
                        </p>
                      </td>
                      <td>
                        <p>{timeAgo(blk.timestamp)}</p>
                      </td>
                      <td>
                        <Link
                          className='link'
                          href={`/txs?block=${blk.number}`}
                        >
                          {blk.transactions.length}
                        </Link>
                      </td>
                      <td>
                        {
                          <Link href={`/address/${blk.miner}`}>
                            {blk.miner.length > 20 && blk.miner.length < 42
                              ? truncateHexString({
                                  hexString: blk.miner,
                                  isEthAddress: false,
                                  letterCount: 17,
                                  positon: 'end',
                                })
                              : truncateHexString({
                                  hexString: blk.miner,
                                  isEthAddress: true,
                                  letterCount: 8,
                                  positon: 'middle',
                                })}
                          </Link>
                        }
                      </td>
                      <td>
                        <p>
                          {blk.gasUsed.toString()} (
                          {calculatePercentGasUsage(blk.gasUsed)})
                        </p>
                      </td>
                      <td>{blk.gasLimit.toString()}</td>
                      <td>
                        {calculateMinerReward(blk.baseFeePerGas, blk.gasLimit)}
                      </td>
                      <td>
                        {calculateBurntFee(blk.baseFeePerGas, blk.gasLimit)}
                      </td>
                      <td>
                        {calculateBurntFee(blk.baseFeePerGas, blk.gasLimit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
