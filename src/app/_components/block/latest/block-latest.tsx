'use client';
import { timeAgo, truncateHexString } from '@/utils/lib';
import { Block } from '@ethersproject/providers';
import Link from 'next/link';
import { ErrorBoundary } from '../../hoc/error-boundary';
import './block-latest.scss';

interface LatestBlocksProps {
  blocks: Block[];
  error: any;
}
export function LatestBlocks(props: LatestBlocksProps) {
  return (
    <ErrorBoundary>
      <div className='latest-block'>
        {props.error.message ? (
          <p>{props.error.message}</p>
        ) : (
          <>
            <div className='header'>
              <h3>Latest Blocks</h3>
            </div>

            <div className='body'>
              <ul className='list'>
                {props.blocks.length > 0 &&
                  props.blocks
                    .filter((_, i) => i < 5)
                    .map((blk, i) => (
                      <li key={blk.number + Math.random() * i} className='item'>
                        <div className='first-block'>
                          <span className='icon'>🧱</span>
                          <span className='title'>Block: </span>
                          <Link className='links' href={`block/${blk.number}`}>
                            {blk.number}
                          </Link>{' '}
                          <span className='time'>
                            {timeAgo(blk.timestamp)} secs ago
                          </span>
                        </div>
                        <div className='second-block'>
                          <p className='text'>
                            <span className='title'> Fee Reciepient: </span>
                            <Link
                              className='links'
                              href={`/address/${blk.miner}`}
                            >
                              {truncateHexString({
                                hexString: blk.miner,
                                letterCount: 4,
                                positon: 'middle',
                                isEthAddress: true,
                              })}
                            </Link>
                          </p>
                        </div>
                        <div className='third-block'>
                          <p>
                            <Link
                              className='links'
                              href={`/txn?block=${blk.number}`}
                            >
                              {blk.transactions.length} txns
                            </Link>{' '}
                            <span>in {timeAgo(blk.timestamp)} secs</span>
                          </p>
                          <span className='tx_value'>{0.23} Eth</span>
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
            <div className='footer-block'>
              <Link href={'/blocks'}>view all blocks →</Link>
            </div>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}