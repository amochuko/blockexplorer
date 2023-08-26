import * as dfns from 'date-fns';
import { BigNumber, ethers } from 'ethers';
import { ethProvider } from './provider';
const provider = ethProvider();

// TODO: finalize
// async function getMarketCap() {
//   const data = await fetchData('global-metrics/quotes/historical');
// }

/**
 * @dev get data from coinmarket cap
 * @param {*} path The endpoint to source data from
 */
export async function fetchData(path: string) {
  try {
    const res = await fetch(`https://pro-api.coinmarketcap.com/v1/${path}`, {
      headers: {
        'X-CMC_PRO_API_KEY': String(process.env.REACT_APP_COINMARKETCAP),
      },
    });

    console.log(res);
  } catch (err) {
    throw err;
  }
}

interface FormatCurrentProps {
  locale?: string;
  amt: number;
}
export const formatNumToCurrency = (args: FormatCurrentProps) => {
  const int = new Intl.NumberFormat(args.locale, {
    maximumFractionDigits: 2,
  });

  return int.format(args.amt);
};

export const isEthAddress = (address: string) => {
  if (!ethers.utils.isAddress(address)) {
    return false;
  }
  return true;
};

export const getEns = (address: string) => {
  const res = '';
  // TODO: lookup ens name for address

  // const p = new ethers.Contract(ENS_CONTRACT_ADDRESS);
  if (isEthAddress(address)) {
    throw Error('Not a valid Ethereum address.');
  }
};

interface ITruncateEthAddress {
  hexString: string;
  letterCount?: number;
  positon?: 'start' | 'middle' | 'end';
  isEthAddress: boolean;
}

export const truncateHexString = (args: ITruncateEthAddress) => {
  if (args.isEthAddress && !isEthAddress(args.hexString)) {
    throw Error('Not a valid Ethereum address.');
  }

  const start =
    '...' + args.hexString.substring(args.hexString.length - args.letterCount!);
  const middle =
    args.hexString.substring(0, args.letterCount) +
    '...' +
    args.hexString.substring(args.hexString.length - args.letterCount!);
  const end = args.hexString.substring(0, args.letterCount) + '...';

  let ans = '';
  switch (args.positon) {
    case 'start':
      ans = start;
      break;
    case 'middle':
      ans = middle;
      break;
    case 'end':
      ans = end;
      break;

    default:
      ans = args.hexString;
  }

  return ans;
};

/**
 *
 * @param param0 {string} Timestamp when to calculate date from.
 * @returns Date
 */
export function timeAgo(timestamp: any) {
  let time;

  if (timestamp) {
    const date = new Date(timestamp);
    const timePeriod = dfns.formatDistanceToNow(timestamp);
    time = timePeriod;
  } else {
    time = 'NA';
  }
  return time;
}
// tx.gasprice * tx.gasLimit = gasUsed
// TODO: convert BiNumber to Ether
// BigNumber to string
// ethers.uitls.formatEther(feeInwei.toString());

/**
 *
 * @param wei BigNumber to format
 * @param fractionDigits Number of digits after decimal point
 * @returns human readable value
 */
interface WeiToEtherArgs {
  wei: BigNumber;
  fractionDigits?: number;
}
export const weiToEther = (args: WeiToEtherArgs) => {
  // TODO: Fix this conversion
  // const n = +ethers.utils.formatEther(args.wei);

  // return args.fractionDigits ? n.toFixed(args.fractionDigits) : n;
  return 0;
};

interface ConvertWeiArgs {
  wei: string;
  toGwei?: boolean;
  toEther?: boolean;
}
/**
 * @dev convert wei to gwei | ether
 */
export const convertWei = (args: ConvertWeiArgs) => {
  // Check with result
  if (args.toGwei) {
    return +args.wei * 10 ** 9;
  }
  if (args.toGwei) {
    return +args.wei * 10 ** 9;
  }
};
/**
 * @dev This function convert ether to dollar value
 * @param ether the value of ether to be converted
 * @returns number equivalent in dollar
 */
export const etherToDollars = (ether: string | number) => {
  // TODO: fix the stub
  return ether;
};

// TODO: fix calculation
// gasPrice * gasUsed by txn
// in gqei
export const getTxnFee = (
  gasLimit: BigNumber,
  baseFee: BigNumber,
  priorityFee: BigNumber
) => {
  // TODO: fix calculation
  // const n = gasLimit.mul(baseFee.add(priorityFee));

  return 'n';
};

// TODO: fix function
export const titleCase = (str: string) => {
  if (str.includes(' ')) {
  }
  return str.split(' ').slice(0);

  //.toUpperCase() + str.slice(1, str.length);
};
