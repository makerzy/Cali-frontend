/* eslint-disable no-param-reassign */
import farmsConfig from "config/farms";
import fetchFarms from "./fetchFarms";
import fetchFarmsPrices from "./fetchFarmsPrices";
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from "./fetchFarmUser";
import { getAddress } from "utils/addressHelper";
import { FarmConfig } from "config/types";

export const fetchFarmsPublicDataAsync = async (
  pids: string[],
): Promise<FarmConfig[]> => {
  const farmsToFetch = farmsConfig.filter((farmConfig) =>
    pids.includes(getAddress(farmConfig.pid)),
  );
  const farms = await fetchFarms(farmsToFetch);
  const farmsWithPrices = await fetchFarmsPrices(farms);
  return farmsWithPrices;
};

interface FarmUserDataResponse {
  pid: string;
  allowance: string;
  tokenBalance: string;
  stakedBalance: string;
  earnings: string;
}

export const fetchFarmUserDataAsync = async (
  account: string,
  pids: string[],
): Promise<FarmUserDataResponse[]> => {
  const farmsToFetch = farmsConfig.filter((farmConfig) =>
    pids.includes(getAddress(farmConfig.pid)),
  );
  const userFarmAllowances = await fetchFarmUserAllowances(
    account,
    farmsToFetch,
  );
  const userFarmTokenBalances = await fetchFarmUserTokenBalances(
    account,
    farmsToFetch,
  );
  const userStakedBalances = await fetchFarmUserStakedBalances(
    account,
    farmsToFetch,
  );
  const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch);
  return userFarmAllowances.map((farmAllowance: any, index: number) => {
    return {
      pid: farmsToFetch[index].pid,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    };
  });
};
