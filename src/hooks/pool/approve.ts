import Web3 from "web3";
import { getBep20Contract } from "utils/contractsHelper";
import { approve } from "utils/ERC20/erc20Calls";
import { getCaliAddress, getStakingAddress } from "utils/addressHelper";

const use_approve = (account: string, _web3: Web3) => {
  return approve(
    getBep20Contract(getCaliAddress(), _web3),
    getStakingAddress(),
    account,
  );
};
export default use_approve;
