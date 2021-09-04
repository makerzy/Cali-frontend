import erc20ABI from "abi/erc20.json";
import stakingContractABI from "abi/cali-staking.json";
import multicall from "utils/multicall";
import { getAddress, getStakingAddress } from "utils/addressHelper";
import { FarmConfig } from "config/types";
import { toBN } from "utils/BigNumber";

export const fetchFarmUserAllowances = async (
  account: string,
  farmsToFetch: FarmConfig[],
) => {
  const stakingAddress = getStakingAddress();

  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.pid);
    return {
      address: lpContractAddress,
      name: "allowance",
      params: [account, stakingAddress],
    };
  });

  const rawLpAllowances = await multicall(erc20ABI, calls);
  const parsedLpAllowances = rawLpAllowances.map((lpBalance: any) => {
    return toBN(lpBalance).toJSON();
  });
  return parsedLpAllowances;
};

export const fetchFarmUserTokenBalances = async (
  account: string,
  farmsToFetch: FarmConfig[],
) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.pid);
    return {
      address: lpContractAddress,
      name: "balanceOf",
      params: [account],
    };
  });

  const rawTokenBalances = await multicall(erc20ABI, calls);
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance: any) => {
    return toBN(tokenBalance).toJSON();
  });
  return parsedTokenBalances;
};

export const fetchFarmUserStakedBalances = async (
  account: string,
  farmsToFetch: FarmConfig[],
) => {
  const stakingAddress = getStakingAddress();

  const calls = farmsToFetch.map((farm) => {
    return {
      address: stakingAddress,
      name: "getUserPoolInfo",
      params: [getAddress(farm.pid), account],
    };
  });

  const rawStakedBalances = await multicall(stakingContractABI, calls);
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance: any) => {
    return toBN(stakedBalance[0]._hex).toJSON();
  });
  return parsedStakedBalances;
};

export const fetchFarmUserEarnings = async (
  account: string,
  farmsToFetch: FarmConfig[],
) => {
  const stakingAddress = getStakingAddress();

  const calls = farmsToFetch.map((farm) => {
    return {
      address: stakingAddress,
      name: "pendingDelfy",
      params: [getAddress(farm.pid), account],
    };
  });

  const rawEarnings = await multicall(stakingContractABI, calls);
  const parsedEarnings = rawEarnings.map((earnings: any) => {
    return toBN(earnings).toJSON();
  });
  return parsedEarnings;
};
