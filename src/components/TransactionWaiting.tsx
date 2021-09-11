import { IonCard, IonIcon, IonText } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { closeOutline } from "ionicons/icons";

const LoadingCardContainer = styled(IonCard)`
  width: 350px;
  height: auto;
  border-radius: 25px;
  color: #333;
`;
const GifWrapper = styled.div`
  width: 60%;
  margin: auto;
  padding: 0 20px;
`;
const TextArea = styled(IonText)`
  text-align: center;
`;

const Header = styled.div`
  padding: 8px 16px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 18px;
  font-weight: bold;
`;
const Icon = styled(IonIcon)`
  font-size: 25px;
`;

interface TrxWaiting {
  msg: string;
  close: () => void;
}

const TransactionWaiting: React.FC<TrxWaiting> = (inputs: TrxWaiting) => {
  return (
    <>
      <LoadingCardContainer>
        <Header>
          <Icon onClick={() => inputs.close()} icon={closeOutline} />
        </Header>
        <GifWrapper>
          <img src='/assets/images/load.gif' alt='loading' />
        </GifWrapper>

        <TextArea>
          <h3>Waiting For Confirmation</h3>
          <h5>{inputs.msg}</h5>
          <p>Confirm this transaction in your wallet</p>
        </TextArea>
      </LoadingCardContainer>
    </>
  );
};

export default TransactionWaiting;
