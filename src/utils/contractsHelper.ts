import { DEFAULT_GAS_PRICE, TESTNET_CHAIN_ID } from "config";
import Web3 from "web3";
import web3NoAccount from "./web3NoAccount";
import { AbiItem } from "web3-utils";
import { getDecimalAmount } from "./formatBalance";
import { toBN } from "./BigNumber";
import bep20Abi from "abi/erc20.json";
import lpTokenAbi from "abi/lpTokenAbi.json";
import MultiCallAbi from "abi/Multicall.json";
import StakingContract from "abi/cali-staking.json";
import { getMultiCallAddress, getStakingAddress } from "./addressHelper";

export const getDefaultGasPrice = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  if (chainId === TESTNET_CHAIN_ID) {
    return 10;
  }
  return DEFAULT_GAS_PRICE;
};

export const getGasPriceInWei = (amountInGwei: number) => {
  return getDecimalAmount(toBN(amountInGwei).toString(), 9);
};

const getContract = (
  abi: any,
  address: string,
  web3?: Web3,
  account?: string,
) => {
  const _web3 = web3 ?? web3NoAccount;
  const gasPrice =
    /* account ? getSettings(account).gasPrice : */ getDefaultGasPrice();

  return new _web3.eth.Contract(abi as unknown as AbiItem, address, {
    gasPrice: getGasPriceInWei(gasPrice).toString(),
  });
};

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3);
};

export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3);
};

export const getStakingContract = (web3?: Web3) => {
  return getContract(StakingContract, getStakingAddress(), web3);
};

export const getMulticallContract = (web3?: Web3) => {
  return getContract(MultiCallAbi, getMultiCallAddress(), web3);
};
