export interface Address {
  test?: string;
  bsc: string;
}

export interface Token {
  symbol: string;
  address: Address;
  decimals?: number;
  projectLink?: string;
  busdPrice?: string;
}

export interface FarmConfig {
  pid: Address;
  lpSymbol: string;
  lpAddresses: Address;
  token: Token;
  quoteToken: Token;
  category: FarmCategory;
  multiplier?: string;
}

export enum FarmCategory {
  pool,
  farm,
}
