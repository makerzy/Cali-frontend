import { FarmConfig } from "config/types";

export type SerializedBigNumber = string;

export interface Farm extends FarmConfig {
  tokenAmountMc?: SerializedBigNumber; // primary token (basic ERC token)
  quoteTokenAmountMc?: SerializedBigNumber; // eg BUSD || BNB || ETH
  tokenAmountTotal?: SerializedBigNumber; // total token in the pair contract
  quoteTokenAmountTotal?: SerializedBigNumber; // total quote token in the pair contract
  lpTotalInQuoteToken?: SerializedBigNumber; // derived vol. of lptoken in the quote token
  lpTotalSupply?: SerializedBigNumber; // total supply of lptoken staking contract
  tokenPriceVsQuote?: SerializedBigNumber; // total usd value of the lptoken
  userData?: {
    allowance: string;
    tokenBalance: string;
    stakedBalance: string;
    earnings: string;
  };
}

export interface Farmx extends FarmConfig {
  tokenAmountMc?: SerializedBigNumber; // primary token (basic ERC token)
  quoteTokenAmountMc?: SerializedBigNumber; // eg BUSD || BNB || ETH
  tokenAmountTotal?: SerializedBigNumber; // total token in the pair contract
  quoteTokenAmountTotal?: SerializedBigNumber; // total quote token in the pair contract
  lpTotalInQuoteToken?: SerializedBigNumber; // derived vol. of lptoken in the quote token
  lpTotalSupply?: SerializedBigNumber; // total supply of lptoken staking contract
  tokenPriceVsQuote?: SerializedBigNumber; // total usd value of the lptoken
  allowance?: SerializedBigNumber;
  tokenBalance?: SerializedBigNumber;
  earnings?: SerializedBigNumber;
  stakedBalance?: SerializedBigNumber;
}

// export interface Pool extends PoolConfig {
//   totalStaked?: BigNumber
//   stakingLimit?: BigNumber
//   startBlock?: number
//   endBlock?: number
//   apr?: number
//   stakingTokenPrice?: number
//   earningTokenPrice?: number
//   isAutoVault?: boolean
//   userData?: {
//     allowance: BigNumber
//     stakingTokenBalance: BigNumber
//     stakedBalance: BigNumber
//     pendingReward: BigNumber
//   }
// }

// Slices states

export interface FarmsState {
  loading: boolean;
  data: Farm[];
  userDataLoaded: boolean;
  // loadArchivedFarmsData: boolean
}

// export interface PoolsState {
//   data: Pool[]
//   userDataLoaded: boolean
// }

// Block

export interface BlockState {
  currentBlock: number;
  initialBlock: number;
}

// Global state

export interface State {
  block: BlockState;
  farms: FarmsState;
  // pools: PoolsState
}
