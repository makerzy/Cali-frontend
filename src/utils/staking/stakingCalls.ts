import { toDefaultDecimal } from "../BigNumber";
import { Contract } from "web3-eth-contract";
import { DEFAULT_GAS_LIMIT } from "config";

// const options = {
//   gasLimit: DEFAULT_GAS_LIMIT,
// };
export const deposit = (
  stakingContract: Contract,

  amount: number,
  withdrawRwd: boolean = false,
  account: string,
) => {
  console.log("amnt: ", amount);
  return stakingContract.methods
    .deposit(toDefaultDecimal(amount).toString(10), withdrawRwd)
    .send({ from: account, gasPrice: "20000000000" });
};

export const claim = (stakingContract: Contract, account: string) => {
  return stakingContract.methods
    .claim()
    .send({ from: account, gasPrice: "20000000000" });
};

export const withdraw = (
  stakingContract: Contract,

  amount: number,
  withdrawRwd: boolean = false,
  account: string,
) => {
  return stakingContract.methods
    .withdraw(toDefaultDecimal(amount).toString(10), withdrawRwd)
    .send({ from: account, gasPrice: "20000000000" });
};
