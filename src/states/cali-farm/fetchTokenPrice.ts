import {
  getAddress,
  getBnbBusdLPAddress,
  getBnbCaliLPAddress,
  getStakingAddress,
} from "utils/addressHelper";
import tokens from "config/tokens";
import multicall from "utils/multicall";
import erc20 from "abi/erc20.json";
import { toBN } from "utils/BigNumber";
import BigNumber from "bignumber.js";
import { getBalanceAmount } from "utils/formatBalance";
import stakingContractABI from "abi/cali-staking.json";

export const getBnbBusdPrice = async () => {
  const bnbBusdPool = getBnbBusdLPAddress() as string;
  const bnbAddress = getAddress(tokens.wbnb.address) as string;
  const busdAddress = getAddress(tokens.busd.address) as string;
  // console.log("BUSD Address: ", busdAddress);
  // console.log("BNB Address: ", bnbAddress);
  // console.log("BNBBUSD POOL Address: ", bnbBusdPool);
  const calls = [
    {
      address: bnbAddress,
      name: "balanceOf",
      params: [bnbBusdPool],
    },
    {
      address: busdAddress,
      name: "balanceOf",
      params: [bnbBusdPool],
    },
  ];
  const [bnbVolume, busdVolume] = await multicall(erc20, calls);
  const bnbPerBusd = toBN(bnbVolume).dividedBy(toBN(busdVolume)); // usd value
  const busdPerBNB = toBN(busdVolume).dividedBy(toBN(bnbVolume)); // bnb value
  // console.log(
  //   "BNB_BUSD_PRICE: ",
  //   bnbPerBusd.toString(10),
  //   "BUSD_BNB_PRICE: ",
  //   busdPerBNB.toString(10),
  // );
  return { bnbPerBusd, busdPerBNB };
};

export const getCaliBusdPrice = async () => {
  const caliPool = getBnbCaliLPAddress() as string;
  const stakingAddress = getStakingAddress();
  const bnbAddress = getAddress(tokens.wbnb.address) as string;
  const caliAddress = getAddress(tokens.cali.address) as string;

  const calls = [
    {
      address: bnbAddress,
      name: "balanceOf",
      params: [caliPool],
    },
    {
      address: caliAddress,
      name: "balanceOf",
      params: [caliPool],
    },
    {
      address: caliPool,
      name: "totalSupply",
    },
  ];

  const [bnbVolume, caliVolume, totalSupply] = await multicall(erc20, calls);
  const secondCall = [
    {
      address: stakingAddress,
      name: "rewardPerToken",
    },
    {
      address: stakingAddress,
      name: "poolSupply",
    },
  ];
  const [rewardPerToken, poolSupply] = await multicall(
    stakingContractABI,
    secondCall,
  );
  let totalBnbBusdValue,
    totalCaliBusdValue,
    caliPerBusdValue,
    poolValueInBNB,
    poolValueInBUSD,
    poolValueInCali,
    farmWorthUsd,
    caliLpUsdvalue;

  poolValueInBNB = toBN(bnbVolume).times(2);
  poolValueInCali = toBN(caliVolume).times(2);
  const bnbBusdPrice = await getBnbBusdPrice();
  totalBnbBusdValue = getBalanceAmount(bnbVolume).times(
    bnbBusdPrice.busdPerBNB,
  ); // usd Value of BNB

  poolValueInBUSD = totalBnbBusdValue.times(2) as BigNumber;
  totalCaliBusdValue = totalBnbBusdValue;
  caliPerBusdValue = totalBnbBusdValue.div(
    getBalanceAmount(caliVolume),
  ) as BigNumber;
  caliLpUsdvalue = poolValueInBUSD.div(
    getBalanceAmount(totalSupply),
  ) as BigNumber;
  farmWorthUsd = caliLpUsdvalue.times(getBalanceAmount(poolSupply));
  return {
    poolValueInBUSD,
    caliPerBusdValue,
    caliLpUsdvalue,
    farmWorthUsd,
    rewardPerToken: getBalanceAmount(rewardPerToken).toNumber().toFixed(),
  };
};
