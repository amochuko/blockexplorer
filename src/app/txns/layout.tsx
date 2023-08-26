import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { ErrorBoundary } from '../_components/hoc/error-boundary';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Transactions',
  description: 'List of transactions',
};

interface TransactionLayoutProps {
  children: React.ReactNode;
}
export default function TransactionLayout(props: TransactionLayoutProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>{props.children}</Suspense>
    </ErrorBoundary>
  );
}
