'use client';

import { ErrorBoundary } from '@/app/_components/hoc/error-boundary';
import { Suspense } from 'react';
import { Header } from '../_components/header/header';
import { useBlock } from '../_components/hooks/useBlock';
import { useEtherPrice } from '../_components/hooks/useEtherPrice';
import { Transactions } from '../_components/transaction/Transactions';

export default function TransactionsPage() {
    const {pendingTxns, finalizedBlock } = useBlock();
    const { ethPrice } = useEtherPrice();

    const data = [
      { title: 'transactions', value: ethPrice },
      {
        title: 'Pending Tnx(s)',
        value: pendingTxns,
      },
      { title: 'Network Txn Fee (24%)', value: finalizedBlock },
      { title: 'Average Txn Fee (24%)', value: 0 },
    ];

  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Loading latest transaction...</p>}>
        <Header data={data} />
        <div className='latest-trasactions'>
          <Transactions />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
