'use client';

import { getMarketCap } from '@/app/api/data';
import { formatNumToCurrency } from '@/utils/lib';
import { LatestBlocks } from '../block';
import { Header } from '../header/header';
import { useBlock } from '../hooks/useBlock';
import { useEtherPrice } from '../hooks/useEtherPrice';
import { LatestTransactions } from '../transaction/latest/latest-transactions';
import './dashboard.scss';

export function Dashboard(props: any) {
  const { block, blocks, error, pendingTxns, finalizedBlock } = useBlock();
  const { ethPrice } = useEtherPrice();

  const data = [
    {
      title: 'ether price',
      value: `$ ${formatNumToCurrency({ amt: ethPrice })}`,
    },
    {
      title: 'Market cap',
      value: `$ ${formatNumToCurrency({ amt: getMarketCap() })}`,
    },
    { title: 'last finalized block', value: finalizedBlock },
    { title: 'Pending Tnx(s)', value: pendingTxns },
  ];

  return (
    <div className='dashboard'>
      {error.message ? <p>error.message</p> : null}
      <Header data={data} />

      <div className='main'>
        <div className='latest-blocks'>
          <LatestBlocks blocks={blocks!} error={error} />
        </div>

        <div className='latest-txns'>
          <LatestTransactions block={block} limit={5} />
        </div>
      </div>
    </div>
  );
}
