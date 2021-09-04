import {
  IonAvatar,
  IonButton,
  IonCard,
  IonChip,
  IonIcon,
  IonText,
} from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: "auto";
`;

const TopComponent = styled.div`
  border-radius: 25px;
  border: 1px #b8b8b8 solid;
  height: auto;
  padding: 20px 20px 30px;
`;

const TopHeader = styled.h4`
  font-weight: bold;
`;
const CaliCard = styled(IonCard)`
  border-radius: 25px !important;
  width: 320px;
  height: "auto";
  padding-bottom: 20px;
`;

const CaliCardheader = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #eee;
`;

const CaliHeaderDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Key = styled.h6`
  padding: 0 !important;
  margin: 0 !important;
  color: #000;
`;

const Value = styled.h6`
  font-weight: bold;
  padding: 0 !important;
  margin: 0 !important;
  color: #000;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #ddd;
  width: 100%;
  margin: 20px 0;
`;

const BtmDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const ColoredH5 = styled.h5`
  color: #8169ae !important;
`;

const Farmcard: React.FC = () => {
  return (
    <>
      <Container>
        <TopComponent>
          <TopHeader>Farming</TopHeader>
          <IonText>
            Stake your PancakeSwap CALI/BNB liquidity pool tokens to earn upto
            500% APY
          </IonText>
        </TopComponent>
        <CaliCard>
          <CaliCardheader>
            <IonAvatar>
              <img src='/assets/svgs/caliLogo.svg' />
            </IonAvatar>
            <CaliHeaderDetail>
              <h4>
                <b>CALI-BNB</b>
              </h4>
              <IonChip
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  margin: "auto",
                  paddingBottom: "12px",
                }}>
                <h6>
                  <b>20X</b>
                </h6>
              </IonChip>
            </CaliHeaderDetail>
          </CaliCardheader>
          <DetailsContainer>
            <Key>APR:</Key>
            <Value>100000.5%</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Key>Earn:</Key>
            <Value>CALI</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Key>
              <b>0.0000</b>
            </Key>
            <IonButton size='small'>Harvest</IonButton>
          </DetailsContainer>

          <IonButton
            style={{
              width: "90%",
              margin: "auto",
            }}
            expand='block'>
            Unlock Wallet
          </IonButton>
          <Divider />
          <BtmDetail>
            <IonIcon size='large' src='/assets/svgs/verified.svg' />

            <Detail>
              Detail
              <h1>
                <IonIcon icon={chevronDownOutline} />
                {/* <IonIcon icon={chevronUpOutline} /> */}
              </h1>
            </Detail>
          </BtmDetail>
          <BtmDetail>
            <ColoredH5>Total Liquidity: </ColoredH5>
            <h4>
              <b>$10,000,000</b>
            </h4>
          </BtmDetail>
          <BtmDetail>
            <div>
              <ColoredH5>Add CALI to Metamask</ColoredH5>{" "}
            </div>
          </BtmDetail>
        </CaliCard>
      </Container>
    </>
  );
};

export default Farmcard;
