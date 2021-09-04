import BigNumber from "bignumber.js";
import { BIG_ONE, BIG_ZERO, toBN } from "utils/BigNumber";
import { filterFarmsByQuoteToken } from "utils/farmsPriceHelpers";
import { getAddress, getBnbBusdLPAddress } from "utils/addressHelper";
import { Farm } from "../types";

const getFarmFromTokenSymbol = (
  farms: Farm[],
  tokenSymbol: string,
  preferredQuoteTokens?: string[],
): Farm => {
  const farmsWithTokenSymbol = farms.filter(
    (farm) => farm.token.symbol === tokenSymbol,
  );
  const filteredFarm = filterFarmsByQuoteToken(
    farmsWithTokenSymbol,
    preferredQuoteTokens,
  );
  return filteredFarm;
};

const getFarmBaseTokenPrice = (
  farm: Farm,
  quoteTokenFarm: Farm,
  bnbPriceBusd: BigNumber,
): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote);

  if (farm.quoteToken.symbol === "BUSD") {
    return hasTokenPriceVsQuote ? toBN(farm.tokenPriceVsQuote) : BIG_ZERO; // returns the usd val of the token
  }

  if (farm.quoteToken.symbol === "wBNB") {
    return hasTokenPriceVsQuote
      ? bnbPriceBusd.times(farm.tokenPriceVsQuote)
      : BIG_ZERO; // returns the usd val of the token
  }

  // We can only calculate profits without a quoteTokenFarm for BUSD/BNB farms
  if (!quoteTokenFarm) {
    return BIG_ZERO;
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't BUSD or wBNB, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - BNB, (pBTC - BNB)
  // from the BNB - pBTC price, we can calculate the PNT - BUSD price
  if (quoteTokenFarm.quoteToken.symbol === "wBNB") {
    const quoteTokenInBusd = bnbPriceBusd.times(
      quoteTokenFarm.tokenPriceVsQuote,
    );
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? toBN(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO;
  }

  if (quoteTokenFarm.quoteToken.symbol === "BUSD") {
    const quoteTokenInBusd = quoteTokenFarm.tokenPriceVsQuote;
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? toBN(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO;
  }

  // Catch in case token does not have immediate or once-removed BUSD/wBNB quoteToken
  return BIG_ZERO;
};

const getFarmQuoteTokenPrice = (
  farm: Farm,
  quoteTokenFarm: Farm,
  bnbPriceBusd: BigNumber,
): BigNumber => {
  if (farm.quoteToken.symbol === "BUSD") {
    return BIG_ONE;
  }

  if (farm.quoteToken.symbol === "wBNB") {
    return bnbPriceBusd;
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO;
  }

  if (quoteTokenFarm.quoteToken.symbol === "wBNB") {
    return quoteTokenFarm.tokenPriceVsQuote
      ? bnbPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote)
      : BIG_ZERO;
  }

  if (quoteTokenFarm.quoteToken.symbol === "BUSD") {
    return quoteTokenFarm.tokenPriceVsQuote
      ? toBN(quoteTokenFarm.tokenPriceVsQuote)
      : BIG_ZERO;
  }

  return BIG_ZERO;
};

const fetchFarmsPrices = async (farms: Farm[]) => {
  const bnbBusdFarm = farms.find(
    (farm: Farm) => getAddress(farm.pid) === getBnbBusdLPAddress(),
  );
  const bnbPriceBusd = bnbBusdFarm.tokenPriceVsQuote
    ? BIG_ONE.div(bnbBusdFarm.tokenPriceVsQuote)
    : BIG_ZERO;
  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(
      farms,
      farm.quoteToken.symbol,
    );
    const baseTokenPrice = getFarmBaseTokenPrice(
      farm,
      quoteTokenFarm,
      bnbPriceBusd,
    );
    const quoteTokenPrice = getFarmQuoteTokenPrice(
      farm,
      quoteTokenFarm,
      bnbPriceBusd,
    );
    const token = { ...farm.token, busdPrice: baseTokenPrice.toJSON() };
    const quoteToken = {
      ...farm.quoteToken,
      busdPrice: quoteTokenPrice.toJSON(),
    };
    return { ...farm, token, quoteToken };
  });

  return farmsWithPrices;
};

export default fetchFarmsPrices;
