import BigNumber from "bignumber.js";
import { BLOCKS_PER_YEAR, CALI_PER_YEAR } from "../config";
import { toBN } from "./BigNumber";

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param delfyPriceUsd Delfy price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */

export const getCaliFarmApr = (
  caliPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
): number => {
  const yearlyCaliRewardAllocation = CALI_PER_YEAR.times(1);
  const apr = yearlyCaliRewardAllocation
    .times(caliPriceUsd)
    .div(poolLiquidityUsd)
    .times(100);
  return apr.isNaN() || !apr.isFinite() ? 0 : apr.toNumber();
};
