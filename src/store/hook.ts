import { useSelector } from "react-redux";

export const useAccount = () => {
  const account = useSelector((state: any) => state.user.account);
  console.log("Acct: ", account);
  return account;
};

export const useNetwork = () => {
  const network = useSelector((state: any) => state.user.networkId);
  return network;
};

export const useFarm = () => {
  const farm = useSelector((state: any) => state.farm);
  return farm;
};
