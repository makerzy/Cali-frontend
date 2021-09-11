import erc20ABI from "abi/erc20.json";
import stakingContractABI from "abi/cali-staking.json";
import multicall from "utils/multicall";
import { getBnbCaliLPAddress, getStakingAddress } from "utils/addressHelper";
import { toBN } from "utils/BigNumber";

export const fetchFarmUserAllowance = async (account: string) => {
  const stakingAddress = getStakingAddress();
  const lpContractAddress = getBnbCaliLPAddress();
  const calls = [
    {
      address: lpContractAddress,
      name: "allowance",
      params: [account, stakingAddress],
    },
  ];

  const [rawLpAllowances] = await multicall(erc20ABI, calls);
  // console.log("Allowances: ", toBN(rawLpAllowances).toJSON());
  return toBN(rawLpAllowances).toJSON();
};

export const fetchFarmUserTokenBalance = async (account: string) => {
  const lpContractAddress = getBnbCaliLPAddress();
  const calls = [
    {
      address: lpContractAddress,
      name: "balanceOf",
      params: [account],
    },
  ];

  const [rawTokenBalances] = await multicall(erc20ABI, calls);
  // console.log("TokenBal: ", toBN(rawTokenBalances).toJSON());
  return toBN(rawTokenBalances).toJSON();
};

export const fetchFarmUserStakedBalance = async (account: string) => {
  const stakingAddress = getStakingAddress();
  const calls = [
    {
      address: stakingAddress,
      name: "getUserPoolInfo",
      params: [account],
    },
  ];

  const [rawStakedBalances] = await multicall(stakingContractABI, calls);
  // console.log(
  //   "StakedBal: ",
  //   rawStakedBalances,
  //   toBN(rawStakedBalances[0]._hex).toJSON(),
  // );
  return toBN(rawStakedBalances[0]._hex).toJSON();
};

export const fetchFarmUserEarnings = async (account: string) => {
  const stakingAddress = getStakingAddress();

  const calls = [
    {
      address: stakingAddress,
      name: "pendingCali",
      params: [account],
    },
  ];

  const [rawEarnings] = await multicall(stakingContractABI, calls);
  // console.log("earnings: ", toBN(rawEarnings).toJSON());
  return toBN(rawEarnings).toJSON();
};
