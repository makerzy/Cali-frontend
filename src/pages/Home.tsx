import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";

import { Header, FarmCard, FooterComponent } from "components";
import {
  useAccount,
  useCaliBusdValue,
  useCaliLPBusdValue,
  useFarm,
  useUpdated,
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
  const { userDataLoaded, data } = useFarm();
  const [fetched, setFetched] = useState(false);
  useUpdated();
  useEffect(() => {
    if (!fetched) {
      account
        ? dispatch({ type: FETCH_FARM, payload: { account } })
        : dispatch({ type: FETCH_FARM });
      setFetched(true);
    }

    setFarm(data);

    const apr = getCaliFarmApr(
      toBN(data?.caliLpBusd),
      toBN(data?.totalPoolValueBusd),
    );
    setTotalLiquidityBusd(data?.totalPoolValueBusd);
    setApr(apr);
  }, [account, data]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='dark'>
          <Header />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Content>
          {/* <Container> */}
          <FarmCard
            userData={userDataLoaded ? farm?.user : null}
            {...{ account, apr, totalLiquidityBusd, caliLPUsd, caliUsd }}
          />
          {/* </Container> */}
          <FooterComponent />
        </Content>
      </IonContent>
    </IonPage>
  );
};

export default Home;
