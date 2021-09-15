import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

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

const Content = styled(IonContent)`
  --background: #f1f5f7 url(${background}) repeat center center;
  /* height: auto; */
  /* padding-bottom: 40px; */
  /* width: 100%; */
`;
const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CopyRight = styled.div``;

const Home: React.FC = () => {
  const account = useAccount();
  useUpdated();
  const dispatch = useDispatch();
  const [apr, setApr] = useState<number>(0);
  const [totalLiquidityBusd, setTotalLiquidityBusd] = useState<string>("0");
  const [farm, setFarm] = useState<Farm>(null);
  const caliLPUsd = useCaliLPBusdValue();
  const caliUsd = useCaliBusdValue();
  const { userDataLoaded, data } = useFarm();

  useEffect(() => {
    setFarm(data);
    console.log("FArm: ", data);
    const apr = getCaliFarmApr(
      toBN(data?.caliLpBusd),
      toBN(data?.totalPoolValueBusd),
    );
    setTotalLiquidityBusd(data?.totalPoolValueBusd);
    setApr(apr);
  }, [dispatch, account, data]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <Header />
        </IonToolbar>
      </IonHeader>
      <Content>
        {/* <Content> */}
        <FarmCard
          userData={userDataLoaded ? farm?.user : null}
          {...{ account, apr, caliLPUsd, caliUsd }}
          farmWorth={farm?.farmWorthUsd}
          rewardPerToken={farm?.rewardPerToken}
        />
        {/* </Content> */}
      </Content>
      <IonFooter>
        <IonToolbar color='primary'>
          <Footer>
            <CopyRight>
              © {new Date().getFullYear()} CALICOIN - ALL RIGHTS RESERVED.
            </CopyRight>
          </Footer>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
