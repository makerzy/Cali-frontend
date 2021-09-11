import React, { useState } from "react";
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
import { useCaliLPBusdValue, useUserPoolInfo } from "store/hook";
import { toBN } from "utils/BigNumber";
import { formartUSD, handleUSDValue } from "utils/formatBalance";
import { FarmUserDataResponse } from "states/types";

const CardContainer = styled(IonCard)`
  width: 320px;
  height: auto;
  margin: 50% auto;
  border-radius: 25px;
`;
const BottomContainer = styled.div`
  padding: 20px;
  width: 100%;
`;
const HeaderContainer = styled.div`
  padding: 20px 20px 10px;
  background-color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WordArea = styled.h5`
  color: #725c99;
`;
const IconArea = styled(IonIcon)``;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0 10px;
  align-items: center;
`;

const CaliLogoArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const SmallIcon = styled(IonIcon)`
  margin-right: 10px;
`;

const List = styled(IonList)`
  border-radius: 18px;
  border: 1px solid #bec3f3;
  padding: 10px;
  height: 90px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
`;
const ListDiv = styled.div`
  text-align: right;
`;

const Input = styled(IonInput)`
  font-size: 20px;
  font-weight: bold;
  text-align: right;
`;

const PercentArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;
const Button = styled(IonButton)`
  border-radius: 18px;
`;
interface IStake {
  actionType?: string;
  actionHandler?: (value: number) => void;
  approveHandler?: () => void;
  close: () => void;
  caliLPBusd: string;
  userData: FarmUserDataResponse;
}

const StakeCard: React.FC<IStake> = ({
  actionType,
  actionHandler,
  approveHandler,
  caliLPBusd,
  userData,
  close,
}) => {
  const [value, setValue] = useState<number>(null);

  const handlePercent = (_value: number) => {
    if (userData) {
      if (actionType === "stake") {
        const percent = toBN(userData?.tokenBalance)
          .multipliedBy(_value)
          .dividedBy(100);
        setValue(percent.toNumber());
      } else {
        const percent = toBN(userData?.stakedBalance)
          .multipliedBy(_value)
          .dividedBy(100);
        console.log("value: ", percent.toString());
        setValue(percent.toNumber());
      }
    }
  };

  return (
    <CardContainer>
      <HeaderContainer>
        <WordArea>
          <b>
            {actionType && actionType === "stake" ? `Stake in Pool` : `Unstake`}
          </b>{" "}
        </WordArea>
        <IconArea
          onClick={close}
          color='primary'
          size='large'
          icon={closeOutline}
        />
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
              onIonChange={(e) => setValue(+e.detail.value)}
              type='number'
              placeholder='0.0'
              value={value}
              step='any'></Input>
            <ListDiv>
              <b>{`~${formartUSD(handleUSDValue(value ?? 0, caliLPBusd))}`}</b>
            </ListDiv>
          </Item>
        </List>
        <ListDiv>
          <p style={{ color: "#725c99", margin: "5px 8px" }}>
            <b>
              {actionType && actionType === "stake"
                ? `Balance : ${(+userData?.tokenBalance).toFixed(3)}`
                : `Staked Balance: ${(+userData?.stakedBalance).toFixed(
                    3,
                  )}`}{" "}
              CALI-BNB
            </b>
          </p>
        </ListDiv>
        <PercentArea>
          {[25, 50, 75, 100].map((num, k) => (
            <IonChip
              onClick={() => handlePercent(num)}
              color='tertiary'
              key={k}>
              {num === 100 ? "Max" : `${num}%`}
            </IonChip>
          ))}
        </PercentArea>
        <ButtonContainer>
          {actionType === "stake" &&
          (+userData?.allowance === 0 || +userData?.allowance < value) ? (
            <Button disabled={!value} onClick={approveHandler} expand='block'>
              <b>Approve</b>
            </Button>
          ) : (
            <Button
              disabled={!value}
              onClick={() => actionHandler(value)}
              expand='block'>
              <b>Confirm</b>
            </Button>
          )}
        </ButtonContainer>
      </BottomContainer>
    </CardContainer>
  );
};

export default StakeCard;
