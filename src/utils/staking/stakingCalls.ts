import { toDefaultDecimal } from "../BigNumber";
import { Contract } from "web3-eth-contract";

export const deposit = (
  stakingContract: Contract,

  amount: number,
  withdrawRwd: boolean = false,
  account: string,
) => {
  console.log("amnt: ", amount);

  return stakingContract.methods
    .deposit(toDefaultDecimal(amount).toString(10), withdrawRwd)
    .send({ from: account });
};

export const claim = (
  stakingContract: Contract,

  account: string,
) => {
  return stakingContract.methods.claim().send({ from: account });
};

export const withdraw = (
  stakingContract: Contract,

  amount: number,
  withdrawRwd: boolean = false,
  account: string,
) => {
  return stakingContract.methods
    .withdraw(toDefaultDecimal(amount).toString(10), withdrawRwd)
    .send({ from: account });
};
