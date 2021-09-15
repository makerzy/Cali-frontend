import tokens from "./tokens";
import { FarmCategory, FarmConfig } from "./types";

const farms: FarmConfig[] = [
  {
    pid: { test: "0x705A364C6aE1daa6043DdBf71923B50d67046839", bsc: "" },
    lpSymbol: "CALI-BNB",
    category: FarmCategory.farm,
    lpAddresses: {
      test: "0x705A364C6aE1daa6043DdBf71923B50d67046839",
      bsc: "",
    },
    token: tokens.cali,
    quoteToken: tokens.wbnb,
  },
];

export default farms;
