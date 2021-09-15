import Web3 from "web3";
import { getStakingContract } from "utils/contractsHelper";
import { deposit } from "utils/staking/stakingCalls";

const use_stake = (amount: number, account: string, _web3: Web3) => {
  return deposit(getStakingContract(_web3), amount, account);
};

export default use_stake;
