import React, { useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonChip,
  IonIcon,
  IonText,
} from "@ionic/react";
import styled from "styled-components";
import {
  chevronDownOutline,
  chevronUpOutline,
  addOutline,
  removeOutline,
} from "ionicons/icons";
import { web3 as connect } from "hooks/useWeb3Provider";

import { useAccount } from "store/hook";

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const TopComponent = styled.div`
  border-radius: 25px;
  border: 1px #b8b8b8 solid;
  height: auto;
  padding: 20px 20px 30px;
  margin-bottom: 10px;
`;

const TopHeader = styled.h4`
  font-weight: bold;
`;
const CaliCard = styled(IonCard)`
  border-radius: 25px !important;
  width: 320px;
  height: auto;
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
  padding: 10px 20px;
`;

const Key = styled.h6`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  margin: 20px 0 0;
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

const SmallContainer = styled.div`
  display: block;
  width: 100%;
  padding: 10px 20px 0;
  margin: 0;
`;

const StakeBtn = styled(IonButton)`
  border-radius: 12px;
  width: 50px;
`;

const StakeArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled(IonIcon)`
  width: 80%;
  height: 80%;
`;

interface IFarm {
  account: string;
}

const Farmcard: React.FC<IFarm> = ({ account }) => {
  const [open, setopen] = useState(false);
  const [locked, setLocked] = useState<boolean>(true);
  const unlockWallet = async () => {
    await connect();
    setLocked(false);
    window.location.reload();
  };

  if (account && locked) {
    setLocked(false);
    console.log("Account: ", account);
  }
  return (
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
            <img src='/assets/svgs/caliBnb.svg' />
          </IonAvatar>
          <CaliHeaderDetail>
            <h4 style={{ color: "#000" }}>
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
        <SmallContainer>
          <p style={{ padding: "0", margin: "0" }}>
            <strong>Cali Earned</strong>
          </p>
        </SmallContainer>
        <DetailsContainer>
          <Key>
            <b>0.0000</b>
            <small style={{ color: "#8169ae" }}>$1,000,000</small>
          </Key>
          <IonButton disabled={!account?.length} size='small'>
            Harvest
          </IonButton>
        </DetailsContainer>
        {account && account.length ? (
          <>
            <SmallContainer>
              <p style={{ padding: "0", margin: "0" }}>
                <strong>CaliLP Staked</strong>
              </p>
            </SmallContainer>
            <DetailsContainer style={{ paddingBottom: "0" }}>
              <Key>
                <b>0.0000</b>
                <small style={{ color: "#8169ae" }}>$1,000,000</small>
              </Key>
              <StakeArea>
                <StakeBtn fill='outline'>
                  <Icon icon={addOutline} />
                </StakeBtn>
                <StakeBtn fill='outline'>
                  <Icon icon={removeOutline} />
                </StakeBtn>
              </StakeArea>
            </DetailsContainer>
          </>
        ) : (
          <IonButton
            style={{
              width: "90%",
              margin: "auto",
            }}
            onClick={unlockWallet}
            expand='block'>
            Unlock Wallet
          </IonButton>
        )}
        <Divider />
        <BtmDetail>
          <IonIcon size='large' src='/assets/svgs/verified.svg' />

          <Detail onClick={() => (!open ? setopen(true) : setopen(false))}>
            {open ? "Hide" : "Detail"}
            <h1>
              <IonIcon icon={open ? chevronUpOutline : chevronDownOutline} />
              {/* <IonIcon icon={chevronUpOutline} /> */}
            </h1>
          </Detail>
        </BtmDetail>
        {open && (
          <>
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
          </>
        )}
      </CaliCard>
    </Container>
  );
};

export default Farmcard;
