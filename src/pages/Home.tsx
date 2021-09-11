import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";

import { Header, FarmCard } from "components";
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
import styled from "styled-components";
import background from "./bgsvg.svg";
const Content = styled.div`
  background: #f1f5f7 url(${background}) repeat center center;
  height: 100%;
  width: 100%;
`;
const Home: React.FC = () => {
  const account = useAccount();
  const dispatch = useDispatch();
  const [apr, setApr] = useState<number>(0);
  const [totalLiquidityBusd, setTotalLiquidityBusd] = useState<string>("0");
  const [farm, setFarm] = useState<Farm>(null);
  const caliLPUsd = useCaliLPBusdValue();
  const caliUsd = useCaliBusdValue();
  const { loading, userDataLoaded, data } = useFarm();
  useEffect(() => {
    dispatch({ type: FETCH_FARM });
    if (account) {
      dispatch({ type: FETCH_FARM, payload: { account } });
      setInterval(() => {
        dispatch({ type: FETCH_FARM, payload: { account } });
      }, 60_000);
    }
  }, [account]);

  if (!loading && !farm && data) {
    setFarm(data);
    const apr = getCaliFarmApr(
      toBN(data.caliLpBusd),
      toBN(data.totalPoolValueBusd),
    );
    console.log("Apr: ", apr);
    setTotalLiquidityBusd(data?.totalPoolValueBusd);
    setApr(apr);
  }

  return (
    <IonPage>
      <IonHeader collapse='condense'>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Content>
          <FarmCard
            userData={userDataLoaded ? data?.user : null}
            {...{ account, apr, totalLiquidityBusd, caliLPUsd, caliUsd }}
          />
        </Content>
      </IonContent>
    </IonPage>
  );
};

export default Home;
