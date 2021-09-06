export interface Farm {
  caliBusdPrice: string;
  caliLpBusd: string;
  totalPoolValueBusd: string;
  user?: FarmUserDataResponse;
}

export interface FarmUserDataResponse {
  allowance: string;
  tokenBalance: string;
  stakedBalance: string;
  earnings: string;
}
