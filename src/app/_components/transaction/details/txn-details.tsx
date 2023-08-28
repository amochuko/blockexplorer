'use client';

import { convertWei, etherToDollars, timeAgo, weiToEther } from '@/utils/lib';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from '../../hoc/error-boundary';
import { useEthProvider } from '../../hooks/useEthProvider';
import './txn-details.scss';

interface TnxDetailsProps {
  tnxHash: string;
}
export function TxnsDetails(props: TnxDetailsProps) {
  const [txnResponse, setTxnResponse] = useState<TransactionResponse>({});
  const provider = useEthProvider();

  async function getTransaction(txnHash: string) {
    const blkTxn = await provider.getTransaction(txnHash);
    setTxnResponse(blkTxn);
  }

  useEffect(() => {
    getTransaction(props.tnxHash);
  }, []);

  return (
    <ErrorBoundary>
      <div className='txn-details'>
        <div className='info'>
          <h3>Trasaction Details</h3>{' '}
          <span>
            {/* TODO: view previous and Next txn by sender */}
            <span
              className='icon'
              onClick={() => {
                console.log('prev txn');
              }}
            >
              &lt;
            </span>
            <span
              className='icon'
              onClick={() => {
                console.log('next txn');
              }}
            >
              &gt;
            </span>
          </span>
        </div>
        <div className='main'>
          <div className='first'>
            <div className='field'>
              <span className='key'>Transaction Hash</span>
              <span className='value'>{txnResponse.hash}</span>
            </div>
            <div className='field'>
              <div className='key'>
                Status:{' '}
                <span className='badge'>{txnResponse.confirmations}</span>{' '}
              </div>
            </div>
            <div className='field'>
              <span className='key'>Block:</span>
              <span className='value'>
                <Link
                  className='link'
                  href={`/blocks/${txnResponse.blockNumber}`}
                >
                  {txnResponse.blockNumber}
                </Link>
              </span>
            </div>
            <div className='field'>
              <span className='key'>Timestamp:</span>
              <span className='value'>{timeAgo(txnResponse.timestamp)}</span>
            </div>
            <div className='field'>
              <span className='key'>From:</span>
              <span className='value'>
                <Link className='link' href={`/address/${txnResponse.from}`}>
                  {txnResponse.from}
                </Link>
              </span>
            </div>
            <div className='field'>
              <span className='key'>To:</span>
              <span className='value'>
                <Link className='link' href={`/address/${txnResponse.to}`}>
                  {txnResponse.to}
                </Link>
              </span>
            </div>
            <div className='field'>
              <span className='key'>Value:</span>
              <span className='value'>
                {weiToEther({ wei: txnResponse.value, fractionDigits: 5 })} ETH
                <span className='badge'>
                  $
                  {etherToDollars(
                    weiToEther({ wei: txnResponse.value, fractionDigits: 5 })
                  )}
                </span>
              </span>
            </div>
            <div className='field'>
              <span className='key'>Txn Fee:</span>
              <span className='value'>
                {convertWei({
                  wei: String(txnResponse.maxFeePerGas),
                  toEther: true,
                })}
                <span className='badge'>${1.2}</span>
              </span>
            </div>
            <div className='field'>
              <span className='key'>Gas Price:</span>
              <span className='value'>
                {convertWei({
                  wei: String(txnResponse.gasPrice),
                  toGwei: true,
                })}{' '}
                Gwei
              </span>
            </div>
          </div>
        </div>
        <div className='main'>
          <div className='second'>
            <div className='field'>
              <span className='key'>Gas Limit & Usage by Txn:</span>
              <span className='value'>{txnResponse.gasPrice?.toString()}</span>
            </div>
            <div className='field'>
              <span className='key'>Gas Fees:</span>
              <span className='value'>
                Max: {txnResponse.maxFeePerGas?.toString()} Gwei{' '}
              </span>
            </div>
            <div className='field'>
              <span className='key'>Burnt & Txn Saving Fees:</span>
              <span className='value'>
                Max: {txnResponse.maxFeePerGas?.toString()} Gwei{' '}
              </span>
            </div>
            <div className='divider'></div>
            <div className='field'>
              <span className='key'>Other Attributes</span>
              <span className='other-attributes'>
                <span className='badge'>Txn Type: {txnResponse.type}</span>
                <span className='badge'>Nonce: {txnResponse.nonce}</span>
              </span>
            </div>
            <div className='field'>
              <span className='key'>Input Data</span>
              <span className='value'>
                <textarea disabled value={txnResponse.data} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

//      {ethers.utils.formatEther(
// parseFloat(txn.gasPrice.mul(txn.gasLimit))
// )}
