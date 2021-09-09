import React from "react";
import {
  IonButton,
  IonCard,
  IonChip,
  IonIcon,
  IonInput,
  IonList,
} from "@ionic/react";
import styled from "styled-components";
import { closeOutline } from "ionicons/icons";

const CardContainer = styled(IonCard)`
  width: 320px;
  height: auto;
  margin: 20% auto;
  border-radius: 25px;
`;
export const BottomContainer = styled.div`
  padding: 20px;
  width: 100%;
`;
export const HeaderContainer = styled.div`
  padding: 20px 20px 10px;
  background-color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const WordArea = styled.h5`
  color: #725c99;
`;
export const IconArea = styled(IonIcon)``;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0 10px;
  align-items: center;
`;

export const CaliLogoArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const SmallIcon = styled(IonIcon)`
  margin-right: 10px;
`;

export const List = styled(IonList)`
  border-radius: 18px;
  border: 1px solid #bec3f3;
  padding: 10px;
  height: 90px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
export const ListDiv = styled.div`
  text-align: right;
`;

export const Input = styled(IonInput)`
  font-size: 20px;
  font-weight: bold;
  text-align: right;
`;

export const PercentArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;
export const Button = styled(IonButton)`
  border-radius: 18px;
`;
interface IStake {
  actionType?: string;
}
const StakeCard: React.FC<IStake> = ({ actionType }) => {
  return (
    <CardContainer>
      <HeaderContainer>
        <WordArea>
          <b>
            {actionType && actionType === "stake" ? `Stake in Pool` : `Unstake`}
          </b>{" "}
        </WordArea>
        <IconArea color='primary' size='large' icon={closeOutline} />
      </HeaderContainer>
      <BottomContainer>
        <LabelContainer>
          <h6>
            <b>
              {actionType && actionType === "stake" ? `Stake:` : `Unstake`}{" "}
            </b>
          </h6>
          <CaliLogoArea>
            <SmallIcon size='large' src='/assets/svgs/caliLogo.svg' />
            <h6>
              <b>CALI-LP</b>
            </h6>
          </CaliLogoArea>
        </LabelContainer>
        <List>
          <Item>
            <Input
              type='number'
              placeholder='0.0'
              value={null}
              step='any'></Input>
            <ListDiv>
              <b>~0 USD</b>
            </ListDiv>
          </Item>
        </List>
        <ListDiv>
          <p style={{ color: "#725c99", margin: "5px 8px" }}>
            <b>Balance: 1.000100</b>
          </p>
        </ListDiv>
        <PercentArea>
          {[25, 50, 75, 100].map((num, k) => (
            <IonChip color='tertiary' key={k}>
              {num === 100 ? "Max" : `${num}%`}
            </IonChip>
          ))}
        </PercentArea>
        <ButtonContainer>
          {actionType === "stake" && (
            <Button expand='block'>
              <b>Approve</b>
            </Button>
          )}
          <Button expand='block'>
            <b>Confirm</b>
          </Button>
        </ButtonContainer>
      </BottomContainer>
    </CardContainer>
  );
};

export default StakeCard;
