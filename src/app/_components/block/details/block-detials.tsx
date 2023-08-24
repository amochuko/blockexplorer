'use client';
import { ethProvider } from '@/utils/provider';
import { Block } from '@ethersproject/providers';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from '../../hoc/error-boundary';
import './block-details.css';

export function BlockDetails() {
  const [blockLatest, setBlockLatest] = useState<Block>();
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const provider = ethProvider();

  const getLatestBlock = useCallback(async () => {
    const res = await provider.getBlock('latest');
    setBlockLatest(res);
    console.log(BlockDetails.name)
  }, [provider]);

  useEffect(() => {
    //  getLatestBlock();
  },[getLatestBlock, provider]);

  return (
    <ErrorBoundary>
      <div className='block'>
        <h3>Latest Block Details</h3>
        <div className='table'>
          <table>
            <tbody>
              {blockLatest &&
                Object.keys(blockLatest).map((key, i) => {
                  let values = Object.values(blockLatest);
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
                            <Link href={`txs/${blockLatest['number']}`}>
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
                            ` (${((Number(values[i]) / 30000000) * 100).toFixed(
                              2
                            )} %)`
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
    </ErrorBoundary>
  );
}
