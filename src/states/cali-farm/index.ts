import { FarmUserDataResponse } from "states/types";
import { getBalanceAmount } from "utils/formatBalance";
import {
  fetchFarmUserAllowance,
  fetchFarmUserEarnings,
  fetchFarmUserStakedBalance,
  fetchFarmUserTokenBalance,
} from "./fetchFarmUser";
import { getCaliBusdPrice } from "./fetchTokenPrice";

interface Farm {
  caliBusdPrice: string;
  caliLpBusd: string;
  totalPoolValueBusd: string;
}
export const fetchFarm = async () => {
  const { caliLpUsdvalue, caliPerBusdValue, poolValueInBUSD } =
    await getCaliBusdPrice();

  const poolInfo = {
    caliBusdPrice: caliPerBusdValue.toString(10),
    caliLpBusd: caliLpUsdvalue.toString(10),
    totalPoolValueBusd: poolValueInBUSD.toString(10),
  } as Farm;
  console.log("PoolInfo: ", poolInfo);
  return poolInfo;
};

export const fetchFarmUser = async (account: string) => {
  const stakedBalance = await fetchFarmUserStakedBalance(account);
  const allowance = await fetchFarmUserAllowance(account);
  const tokenBalance = await fetchFarmUserTokenBalance(account);
  const earnings = await fetchFarmUserEarnings(account);
  const userData = {
    stakedBalance: getBalanceAmount(stakedBalance).toString(10),
    allowance: getBalanceAmount(allowance).toString(10),
    earnings: getBalanceAmount(earnings).toString(10),
    tokenBalance: getBalanceAmount(tokenBalance).toString(10),
  } as FarmUserDataResponse;
  console.log("userdata: ", userData);
  return userData;
};
