import { BIG_TEN, toBN } from "../utils/BigNumber";

export const BSC_BLOCK_TIME = 3;

export const DELFY_PER_BLOCK = toBN(40);
export const BLOCKS_PER_YEAR = toBN((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000
export const DELFY_PER_YEAR = DELFY_PER_BLOCK.times(BLOCKS_PER_YEAR);
export const BASE_URL = "https://delfyfinance.org";
export const BASE_EXCHANGE_URL = "https://exchange.delfyfinance.org";
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`;
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`;
export const BASE_BSC_SCAN_URL_TX = "https://bscscan.com/tx/";
export const BASE_BSC_SCAN_URL_ADDRESS = "https://bscscan.com/address";
export const BASE_BSC_SCAN_TEST_URL_TX = "https://testnet.bscscan.com/tx/";
export const BASE_BSC_SCAN_TEST_URL_ADDRESS =
  "https://testnet.bscscan.com/address/";
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);
export const DEFAULT_GAS_LIMIT = 200000;
export const DEFAULT_GAS_PRICE = 5;
export const TESTNET_CHAIN_ID = "97";
export const MAINNET_CHAIN_ID = "56";
