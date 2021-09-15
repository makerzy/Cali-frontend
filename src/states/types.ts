export interface Farm {
  caliBusdPrice: string;
  caliLpBusd: string;
  totalPoolValueBusd: string;
  rewardPerToken?: string;
  farmWorthUsd?: string;
  user?: FarmUserDataResponse;
}

export interface FarmUserDataResponse {
  allowance: string;
  tokenBalance: string;
  stakedBalance: string;
  earnings: string;
}

export interface FarmState {
  loading: boolean;
  userDataLoaded: boolean;
  data: Farm;
}
