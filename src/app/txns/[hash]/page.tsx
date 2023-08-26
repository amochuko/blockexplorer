'use client';

import { TxnsDetails } from '@/app/_components/transaction/details/txn-details';
import { Suspense } from 'react';
import './txs-details.scss';

interface SlugProps {
  params: Record<string, any>;
}

export default function TransactionsDetails(props: SlugProps) {
  return (
    <Suspense fallback={<p>Loading transaction detials...</p>}>
      <TxnsDetails tnxHash={props.params.hash} />
    </Suspense>
  );
}
