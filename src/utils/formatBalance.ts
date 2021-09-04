import { BIG_TEN, toBN } from "./BigNumber";

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: any, decimals = 18) => {
  return toBN(amount).times(BIG_TEN.pow(decimals));
};

export const getBalanceAmount = (amount: any, decimals = 18) => {
  return toBN(amount).dividedBy(BIG_TEN.pow(decimals));
};

/**
 * This function is not really necessary but is used throughout the site.
 */

export const getBalanceNumber = (balance: any, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const getFullDisplayBalance = (
  balance: any,
  decimals = 18,
  decimalsToAppear: number = 3,
) => {
  return getBalanceAmount(balance.toString(), decimals).toFixed(
    decimalsToAppear,
  );
};

export const formatNumber = (
  number: number,
  minPrecision = 2,
  maxPrecision = 2,
) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};
