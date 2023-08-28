import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { ErrorBoundary } from '../../_components/hoc/error-boundary';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Address',
  description: 'Details of an Address',
};

interface AddressPageLayoutProps {
  children: React.ReactNode;
}
export default function AddressPageLayout(props: AddressPageLayoutProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>{props.children}</Suspense>
    </ErrorBoundary>
  );
}
