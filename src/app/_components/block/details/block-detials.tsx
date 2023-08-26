'use client';
import { Block } from '@ethersproject/providers';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from '../../hoc/error-boundary';
import './block-details.css';

interface BlockDetailsProps {
  block: Block;
}
export function BlockDetails(props: BlockDetailsProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Loading block details</p>}>
        <div className='block'>
          <h3>Latest Block Details</h3>
          <div className='table'>
            <table>
              <tbody>
                {props.block &&
                  Object.keys(props.block).map((key, i) => {
                    let values = Object.values(props.block);
                    return (
                      <tr key={key + i}>
                        <td>
                          <span className='key'>
                            {' '}
                            {key.replace('_', ' ').slice(0, 1).toUpperCase() +
                              key.slice(1)}
                            :{' '}
                          </span>
                          <span className='value'>
                            {Array.isArray(values[i]) ? (
                              <Link href={`txs/${props.block['number']}`}>
                                {Array(values[i])[0].length + ' transactions'}
                              </Link>
                            ) : typeof values[i] !== 'object' ? (
                              key === 'number' ? (
                                <Link href={`block/${values[i]}`}>
                                  {values[i]}
                                </Link>
                              ) : (
                                values[i]
                              )
                            ) : key === 'gasUsed' ? (
                              new Intl.NumberFormat('en', {
                                maximumFractionDigits: 3,
                              }).format(Number(values[i])) +
                              ` (${(
                                (Number(values[i]) / 30000000) *
                                100
                              ).toFixed(2)} %)`
                            ) : (
                              new Intl.NumberFormat('en', {
                                maximumFractionDigits: 3,
                              }).format(Number(values[i]))
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
