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

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const formartUSD = (value: string) => {
  return value && formatter.format(+value);
};

export const formatThousands = (x: string) => {
  let value = x && x?.split(".");
  return (
    value &&
    `${value[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${
      value.length === 2 ? value[1].slice(0, 2) : "00"
    }`
  );
};

export const handleUSDValue = (value: number, caliLPBusd: string) => {
  return (
    value && caliLPBusd && toBN(value).multipliedBy(caliLPBusd).toString(10)
  );
};
