import Web3 from "web3";
import { getStakingContract } from "utils/contractsHelper";
import { withdraw } from "utils/staking/stakingCalls";

const use_unstake = (amount: number, account: string, _web3: Web3) => {
  return withdraw(
    getStakingContract(_web3),

    amount,

    account,
  );
};

export default use_unstake;
