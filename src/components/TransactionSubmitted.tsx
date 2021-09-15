import { IonButton, IonCard, IonIcon } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { closeOutline } from "ionicons/icons";
import { BASE_BSC_SCAN_TEST_URL_TX } from "config";

const SubmittedCardContainer = styled(IonCard)`
  width: 320px;
  height: auto;
  border-radius: 25px;
  color: #333;
  padding: 20px;
  margin: auto;
`;

const IMageContainer = styled.div`
  width: 60%;
  margin: auto;
`;

const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
`;
const AddTokenButton = styled(IonButton)`
  --border-radius: 15px !important;
  width: 100% !important;
  margin: 4px;
`;
const CloseBuuton = styled(IonButton)`
  --border-radius: 15px !important;
  width: 100%;
  margin: 8px auto;
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

interface TrxSubmitted {
  close: () => void;
  hash: string;
}

const TransactionSubmitted: React.FC<TrxSubmitted> = (
  trxSubmitted: TrxSubmitted,
) => {
  return (
    <SubmittedCardContainer>
      <Header>
        <Icon onClick={() => trxSubmitted.close()} icon={closeOutline} />
      </Header>
      <IMageContainer>
        <img src='/assets/images/arrowUp.png' alt='transaction sent' />
      </IMageContainer>
      <ButtonContainer>
        <AddTokenButton
          href={`${BASE_BSC_SCAN_TEST_URL_TX}${trxSubmitted.hash}`}
          color='primary'
          fill='default'>
          View on Explorer
        </AddTokenButton>
        <AddTokenButton fill='clear'>Add Token to Metamask</AddTokenButton>
      </ButtonContainer>
      <CloseBuuton onClick={() => trxSubmitted.close()}>Close</CloseBuuton>
    </SubmittedCardContainer>
  );
};

export default TransactionSubmitted;
