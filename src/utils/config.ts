export const NEXT_PUBLIC_ALCHEMY_API_TESTNET =
  String(process.env.NEXT_PUBLIC_ALCHEMY_API_TESTNET);
export const NEXT_PUBLIC_ALCHEMY_API_MAINNET =
  process.env.NEXT_PUBLIC_ALCHEMY_API_MAINNET;

export const ENS_CONTRACT_ADDRESS =
  '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85';

export const providerURL =
  process.env.NODE_ENV !== 'production'
    ? NEXT_PUBLIC_ALCHEMY_API_TESTNET
    : NEXT_PUBLIC_ALCHEMY_API_MAINNET;
