import stakingContractABI from "abi/cali-staking.json";
import erc20 from "abi/erc20.json";
import { getAddress, getStakingAddress } from "utils/addressHelper";
import { BIG_TEN, BIG_ZERO, toBN } from "utils/BigNumber";
import multicall from "utils/multicall";
import { Farm, SerializedBigNumber } from "../types";
import { FarmCategory } from "config/types";

type PublicFarmData = {
  tokenAmountMc: SerializedBigNumber;
  quoteTokenAmountMc: SerializedBigNumber;
  tokenAmountTotal: SerializedBigNumber;
  quoteTokenAmountTotal: SerializedBigNumber;
  lpTotalInQuoteToken: SerializedBigNumber;
  lpTotalSupply: SerializedBigNumber;
  tokenPriceVsQuote: SerializedBigNumber;
  poolWeight: SerializedBigNumber;
  multiplier: string;
  allocPoints: SerializedBigNumber;
  totalAllocPoints: SerializedBigNumber;
};

const fetchFarm = async (farm: Farm): Promise<PublicFarmData> => {
  const { pid, lpAddresses, token, quoteToken } = farm;
  const lpAddress = getAddress(lpAddresses);
  const _pid = getAddress(pid);
  const calls = [
    // Balance of token in the LP contract
    {
      address: getAddress(token.address),
      name: "balanceOf",
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: getAddress(quoteToken.address),
      name: "balanceOf",
      params: [lpAddress],
    },
    // // Balance of LP tokens in the master chef contract
    // {
    //   address: lpAddress,
    //   name: 'balanceOf',
    //   params: [getStakingAddress()],
    // },
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: "totalSupply",
    },
    // Token decimals
    {
      address: getAddress(token.address),
      name: "decimals",
    },
    // Quote token decimals
    {
      address: getAddress(quoteToken.address),
      name: "decimals",
    },
  ];

  // Only make masterchef calls if farm has pid
  const [info, totalAllocPoint] = _pid
    ? await multicall(stakingContractABI, [
        {
          address: getStakingAddress(),
          name: "getPool",
          params: [_pid],
        },
        {
          address: getStakingAddress(),
          name: "totalAllocPoint",
        },
      ])
    : [null, null];

  const allocPoint = info ? toBN(info.allocPoint?._hex) : BIG_ZERO;
  const poolWeight = totalAllocPoint
    ? allocPoint.div(toBN(totalAllocPoint))
    : BIG_ZERO;
  const lpTokenBalanceMC = info ? toBN(info.poolSupply?._hex) : BIG_ZERO;
  //  bal token in pContract, bal BNB|BUSD in pContract, token bal in stkContract, totalSupply of LpToken
  const [
    tokenBalanceLP,
    quoteTokenBalanceLP,
    lpTotalSupply,
    tokenDecimals,
    quoteTokenDecimals,
  ] = await multicall(erc20, calls);

  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  const lpTokenRatio =
    farm.category === FarmCategory.farm
      ? toBN(lpTokenBalanceMC).div(toBN(lpTotalSupply))
      : toBN(1);
  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = toBN(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals));
  const quoteTokenAmountTotal = toBN(quoteTokenBalanceLP).div(
    BIG_TEN.pow(quoteTokenDecimals),
  );

  // Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
  const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio);
  // console.log("TokenAmountMC: ", tokenAmountMc.toString(10), _pid);
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio);

  // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = quoteTokenAmountMc.times(toBN(2));

  return {
    tokenAmountMc: tokenAmountMc.toJSON(),
    quoteTokenAmountMc: quoteTokenAmountMc.toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
    lpTotalSupply: toBN(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(), // lp unit price = lpTotalInQuoteToken.div(lpTotalSupply)
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(), // unit value of token in quote token
    poolWeight: poolWeight.toJSON(),
    multiplier: `${allocPoint.toString()}X`,
    allocPoints: allocPoint.toString(),
    totalAllocPoints: totalAllocPoint.toString(),
  };
};

export default fetchFarm;
