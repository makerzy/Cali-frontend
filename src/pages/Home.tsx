import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Farmcard from "components/Farmcard";
import HeaderBar from "components/Header";
import {
  useAccount,
  useCaliBusdValue,
  useCaliLPBusdValue,
  useFarm,
} from "store/hook";
import { useDispatch } from "react-redux";
import { FETCH_FARM } from "sagas/types";
import { getCaliFarmApr } from "utils/aprHelper";
import { toBN } from "utils/BigNumber";
import { Farm } from "states/types";

const Home: React.FC = () => {
  const account = useAccount();
  const [farm, setFarm] = useState<Farm>(null);
  const dispatch = useDispatch();
  const { loading, userDataLoaded, data } = useFarm();
  useEffect(() => {
    dispatch({ type: FETCH_FARM });
    if (account) {
      dispatch({ type: FETCH_FARM, payload: { account } });
    }
  }, [account]);
  if (userDataLoaded && !farm && data) {
    setFarm(data);
    const apr = getCaliFarmApr(toBN(1.5), toBN(1500));
  }
  // const caliPrice = useCaliBusdValue();
  // const caliLpPrice = useCaliLPBusdValue();

  // console.log("CaliPrice: ", caliPrice, "caliLpPrice: ", caliLpPrice);
  return (
    <IonPage>
      <IonHeader collapse='condense'>
        <IonToolbar>
          <HeaderBar />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Farmcard {...{ account }} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
