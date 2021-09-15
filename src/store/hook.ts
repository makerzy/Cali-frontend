import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_FARM } from "sagas/types";
import { Farm, FarmState, FarmUserDataResponse } from "states/types";
export const useAccount = () => {
  const account = useSelector((state: any) => state.user.account);
  // console.log("Acct: ", account);
  return account;
};

export const useNetwork = () => {
  const network = useSelector((state: any) => state.user.networkId);
  return network;
};

export const useFarm = () => {
  const farm = useSelector((state: any) => state?.farm);
  return farm as FarmState;
};

export const useCaliBusdValue = () => {
  const farm = useSelector((state: any) => state?.farm?.data);
  return farm.caliBusdPrice as string;
};

export const useCaliLPBusdValue = () => {
  const farm = useSelector((state: any) => state?.farm?.data);
  return farm?.caliLpBusd as string;
};

export const useUserPoolInfo = () => {
  const farm = useSelector((state: any) => state?.farm?.data);
  return farm?.user as FarmUserDataResponse;
};

export const useUpdated = () => {
  const account = useAccount();
  const dispatch = useDispatch();
  // const [fetched, setFetched] = useState<boolean>(false);
  const dispatchValue = () =>
    account ? { type: FETCH_FARM, payload: { account } } : { type: FETCH_FARM };

  useEffect(() => {
    console.log("Account: ", dispatchValue());
    dispatch(dispatchValue());
    const interval = setInterval(() => {
      dispatch(dispatchValue());
    }, 60_000);

    return () => clearInterval(interval);
  }, [account]);
};
