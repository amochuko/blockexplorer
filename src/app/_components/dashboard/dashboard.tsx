'use client';

import { getMarketCap } from '@/app/api/data';
import { formatNumToCurrency } from '@/utils/lib';
import { LatestBlocks } from '../block';
import { ErrorBoundary } from '../hoc/error-boundary';
import { useBlock } from '../hooks/useBlock';
import { useEtherPrice } from '../hooks/useEtherPrice';
import { BlockTransactions } from '../transaction/transactions';
import './dashboard.scss';

export function Dashboard(props: any) {
  const { block, error, pendingTxns, finalizedBlock } = useBlock();
  const { ethPrice } = useEtherPrice();

  const data = [
    { title: 'ether price', value: ethPrice },
    {
      title: 'Market cap',
      value: `$ ${formatNumToCurrency({ amt: getMarketCap() })}`,
    },
    { title: 'last finalized block', value: finalizedBlock },
    { title: 'Pending Tnx(s)', value: pendingTxns },
  ];

  return (
    <div className='dashboard'>
      <ErrorBoundary>
        {error.message ? <p>error.message</p> : null}
        <ul className='dashboard-header'>
          {data.length > 0 &&
            data.map((itm, i) => (
              <li key={i} className='dashboard-list-itm'>
                <span className='title'>{itm.title.toUpperCase()}:</span>
                <span className='value'>{itm.value}</span>
              </li>
            ))}
        </ul>
      </ErrorBoundary>

      <div className='dashboard-main'>
        <div className='block-latest'>
          <LatestBlocks />
        </div>

        <div className='latest-txn'>
          <BlockTransactions block={block} />
        </div>
      </div>
    </div>
  );
}
