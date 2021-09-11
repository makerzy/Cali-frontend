import { constants } from "ethers";
import { Contract } from "web3-eth-contract";

export const approve = (
  token: Contract,
  addressToApprove: string,
  account: string,
) => {
  return token.methods
    .approve(addressToApprove, constants.MaxUint256.toString())
    .send({ from: account, gasPrice: "20000000000" });
};
