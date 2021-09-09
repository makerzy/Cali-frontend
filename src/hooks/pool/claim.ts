import Web3 from "web3";
import { getStakingContract } from "utils/contractsHelper";
import { claim } from "utils/staking/stakingCalls";

const use_claim = (account: string, _web3: Web3) => {
  return claim(getStakingContract(_web3), account);
};

export default use_claim;
