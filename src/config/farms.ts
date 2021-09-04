import tokens from "./tokens";
import { FarmCategory, FarmConfig } from "./types";

const farms: FarmConfig[] = [
  {
    pid: { test: "0xDE3d5B6dc96A8Bc1aBB01B3A377f75405d3FdD8F", bsc: "" },
    lpSymbol: "CALI-BNB",
    category: FarmCategory.farm,
    lpAddresses: {
      test: "0xDE3d5B6dc96A8Bc1aBB01B3A377f75405d3FdD8F",
      bsc: "",
    },
    token: tokens.cali,
    quoteToken: tokens.wbnb,
  },
];

export default farms;
