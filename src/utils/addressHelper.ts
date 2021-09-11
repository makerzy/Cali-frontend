import { Address } from "config/types";
import addresses from "config/contracts";

export const getNSyb = (network: string) => {
  switch (network) {
    case "4":
      return "ETH";
    case "97":
      return "BSC";
    default:
      return "";
  }
};

export let getAddress = (address: Address): any => {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  return chainId === "56" ? address.bsc : address.test;
  // return  address.test
};

export const getStakingAddress = () => {
  return getAddress(addresses.staking);
};

export const getMultiCallAddress = () => {
  return getAddress(addresses.multiCall);
};

export const getBnbBusdLPAddress = () => {
  return getAddress(addresses.bnbBusd);
};

export const getBnbCaliLPAddress = () => {
  return getAddress(addresses.bnbCali);
};

export const getCaliAddress = () => {
  return getAddress(addresses.cali);
};
