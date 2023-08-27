'use client';
import { useEtherPrice } from '@/app/_components/hooks/useEtherPrice';
import { useProvider } from '@/app/_components/hooks/useProvider';
import {
  etherToDollars,
  getTxnFee,
  timeAgo,
  truncateHexString,
  weiToEther,
} from '@/utils/lib';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import './address-page.scss';

interface AddressPageProps {
  params: Record<string, string>;
}
export default function AddressPage(props: AddressPageProps) {
  const [balance, setBalance] = useState<any>(0);
  const [error, setError] = useState<any>({});
  const { ethPrice } = useEtherPrice();

  const [txnHash, setTxnHash] = useState<string[]>([]);
  const [txnResponse, setTxnResponse] = useState<TransactionResponse[]>([]);
  const provider = useProvider();

  const parseToEther = (val: string) => ethers.utils.parseEther(val);
  const getAddressDetails = useCallback(async () => {
    try {
      const bal = await provider.getBalance(props.params.addr);
      console.log(bal);
      setBalance(parseToEther(bal.toString()));
    } catch (err: any) {
      setError(err.message);
    }
  }, [props.params]);

  const lastTxnSent = useCallback(async() => {
    const lastTxn = await provider.getTransactionCount(props.params.addr)


  },[])


  useEffect(() => {
    getAddressDetails();
  }, []);

  return (
    <div className='address'>
      <div className='intro'>
        <span className='avatar'></span> <h3 className='heading'>Address </h3>
        <span className='addr'>{props.params.addr}</span>
      </div>
      <div className='header'>
        <div className='card'>
          <h3 className='heading'>Overview</h3>
          <div className=''>
            <p className='attr'>Eth balance</p>
            <p className='value'>{balance} ETH</p>
          </div>
          <div className=''>
            <p className='attr'>Eth value</p>
            <p className='value'>
              ${etherToDollars(balance)} (@ {ethPrice}/ETH)
            </p>
          </div>
          <div className=''>
            <p className='attr'>token holdings</p>
            <select className='value' name='token-holdings' id='token-holdings'>
              <option value={'rice'}>{'$550 (21 Tokens)'}</option>
            </select>
          </div>
        </div>
        <div className='card'>
          <h3 className='heading'>More Info</h3>
          <div className=''>
            <p className='attr'>Last Txn sent</p>
            <p className='value'>
              <Link className='link' href={'/txn/'}>
                {truncateHexString({
                  hexString: '0xa168cCF5dBDA0f32819f5F2822eF4437d8a962Ba',
                  isEthAddress: false,
                  letterCount: 14,
                  positon: 'end',
                })}{' '}
              </Link>
              <span className='time'> {timeAgo(1234)}</span>{' '}
            </p>
          </div>
          <div className=''>
            <p className='attr'>First Txn sent</p>
            <p className='value'>
              <Link className='link' href={'addressTo'}>
                {truncateHexString({
                  hexString: '0xa168cCF5dBDA0f32819f5F2822eF4437d8a962Ba',
                  isEthAddress: false,
                  letterCount: 14,
                  positon: 'end',
                })}{' '}
              </Link>
              <span className='time'> {timeAgo(1234)}</span>{' '}
            </p>
          </div>
        </div>
        <div className='card'>
          <h3 className='heading'>Multi Chain</h3>
          <p>TODO:</p>
          {/* TODO: implement from Blockscan api */}
        </div>
      </div>

      <div className='transaction'>
        <div className='main'>
          <div className='info'>
            <p>
              Latest {'#tnxCount'} from a total of {'#totalTxnCount'}
            </p>
          </div>
          {/* TODO: Add Pagination here */}
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  {[
                    'Transaction Hash',
                    'Block',
                    'Age',
                    'From',
                    'To',
                    'Value',
                    'Txn Fee',
                  ].map((itm, i) => (
                    <th key={i}>{itm}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {txnResponse.map((txn, i) => (
                  <tr key={i}>
                    <td>
                      <span>
                        <Link className='link' href={`/txns/${txn.hash}`}>
                          {truncateHexString({
                            hexString: txn.hash,
                            isEthAddress: false,
                            letterCount: 18,
                            positon: 'end',
                          })}
                        </Link>
                      </span>
                    </td>
                    <td>
                      <span>{txn.blockNumber}</span>
                    </td>
                    <td>
                      <span>{timeAgo(txn.timestamp)}</span>
                    </td>
                    <td>
                      <span>
                        <Link className='link' href={`/address/${txn.from}`}>
                          {truncateHexString({
                            hexString: txn.from,
                            isEthAddress: false,
                            letterCount: 8,
                            positon: 'middle',
                          })}
                        </Link>
                      </span>
                    </td>
                    <td>
                      <Link className='link' href={`/address/${txn.to}`}>
                        {truncateHexString({
                          hexString: String(txn.to),
                          isEthAddress: false,
                          letterCount: 8,
                          positon: 'middle',
                        })}
                      </Link>
                    </td>
                    <td>
                      <span>
                        {weiToEther({ wei: txn.value, fractionDigits: 4 })}
                      </span>
                    </td>
                    <td>
                      <span>
                        {getTxnFee(
                          txn.gasLimit,
                          txn.gasPrice!,
                          txn.maxPriorityFeePerGas!
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
