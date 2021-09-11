import { IonButton, IonCard, IonIcon, IonText } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { closeOutline } from "ionicons/icons";

const TransactionDenied = styled(IonCard)`
  width: 320px;
  height: auto;
  border-radius: 25px;
  color: #333;
  padding: 0 20px;
  margin: auto;
`;
const IMageContainer = styled.div`
  width: 60%;
  margin: auto;
`;
const TextArea = styled(IonText)`
  text-align: center;
`;
const CloseBuuton = styled(IonButton)`
  --border-radius: 15px !important;
  width: 100%;
  margin: 8px auto 16px;
`;

const Header = styled.div`
  padding: 12px 12px 0 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 18px;
  font-weight: bold;
`;
const Icon = styled(IonIcon)`
  font-size: 25px;
`;

interface ErrorMsg {
  msg: string;
  close: () => void;
}

const TransactionDeny: React.FC<ErrorMsg> = (error: ErrorMsg) => {
  return (
    <TransactionDenied>
      <Header>
        <Icon onClick={() => error.close()} icon={closeOutline} />
      </Header>
      <IMageContainer>
        <img src='/assets/warning.png' alt='transaction rejected' />
      </IMageContainer>
      <TextArea>
        <h5>{error.msg}</h5>
      </TextArea>
      <CloseBuuton onClick={() => error.close()}>Close</CloseBuuton>
    </TransactionDenied>
  );
};

export default TransactionDeny;
