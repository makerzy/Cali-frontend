import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonChip,
  IonIcon,
  IonText,
  useIonModal,
} from "@ionic/react";
import styled from "styled-components";
import {
  chevronDownOutline,
  chevronUpOutline,
  addOutline,
  removeOutline,
} from "ionicons/icons";
import { web3 as connect, web3 } from "hooks/useWeb3Provider";
import {
  formartUSD,
  formatThousands,
  handleUSDValue,
} from "utils/formatBalance";

import { use_approve, use_claim, use_stake, use_unstake } from "hooks/pool";
import Web3 from "web3";
import {
  StakeCard,
  TransactionDeny,
  TransactionSubmitted,
  TransactionWaiting,
} from "components";
import { FarmUserDataResponse } from "states/types";

const Container = styled.div`
  width: 100%;
  height: auto;
  overflow: auto;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  width: 100%;
  @media (min-width: 750px) {
    width: 750px;
    margin: auto;
    align-items: flex-start;
    flex-direction: row;
    justify-content: center;
  }
`;

const TopComponent = styled(IonCard)`
  border-radius: 25px;
  border: 1px #b8b8b8 solid;
  height: auto;
  width: 320px;
  color: #000;
  padding: 20px 20px 30px;
  margin: 0 auto 10px;
`;

const TopHeader = styled.h4`
  font-weight: bold;
`;
const CaliCard = styled(IonCard)`
  border-radius: 25px !important;
  width: 320px;
  height: auto;
  margin: auto;
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

const CaliBNBIMG = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

interface IFarm {
  account?: string;
  apr: number;
  totalLiquidityBusd: string;
  caliLPUsd: string;
  caliUsd: string;
  userData?: FarmUserDataResponse;
}

const Farmcard: React.FC<IFarm> = ({
  account,
  apr,
  totalLiquidityBusd,
  userData,
  caliLPUsd,
  caliUsd,
}) => {
  const [user, setUser] = useState<FarmUserDataResponse>(null);
  const [open, setopen] = useState(false);
  const [locked, setLocked] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [waitingMsg, setWaitingMsg] = useState<string>("");
  const [txnSubmittedMsg, setTxnSubmittedMsg] = useState<string>("");
  const [actionType, setActionType] = useState<string>("");

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const unlockWallet = async () => {
    await connect();
    setLocked(false);
    window.location.reload();
  };

  if (account && locked) {
    setLocked(false);
    console.log("Account: ", account);
  }

  const handleErrorDismiss = () => {
    dismissPresentError();
  };

  const handleWaitingDismiss = () => {
    dismissTxnWaiting();
  };
  const handleTxSubmittedDismiss = () => {
    dismissSubmitted();
  };

  const [presentError, dismissPresentError] = useIonModal(TransactionDeny, {
    close: handleErrorDismiss,
    msg: errorMsg,
  });
  const [presentTxnWaiting, dismissTxnWaiting] = useIonModal(
    TransactionWaiting,
    { close: handleWaitingDismiss, msg: waitingMsg },
  );
  const [presentSubmitted, dismissSubmitted] = useIonModal(
    TransactionSubmitted,
    { close: handleTxSubmittedDismiss, hash: txnSubmittedMsg },
  );

  const handleDismiss = (userInput?: string) => {
    console.log("userInputs: ", userInput);
    dismissStake();
  };
  const approve = async () => {
    presentTxnWaiting();
    const _web3: Web3 = await web3();
    use_approve(account, _web3)
      .on("transactionHash", (tx: any) => {
        console.log("trxn: ", tx);
        setTxnSubmittedMsg(`${tx}`);
        presentSubmitted();
        dismissTxnWaiting();
      })
      .once("receipt", (receipt: any) => {
        const event = receipt?.events;
        console.log("ReceiptEvents: ", event);
        dismissSubmitted();
      })
      .on("error", (error: any) => {
        console.log("txn errors", error);
        setErrorMsg(error.message);
        presentError();
        dismissTxnWaiting();
      });
  };

  const unstake = async (value: number) => {
    presentTxnWaiting();
    console.log("Number: ", value);
    const _web3: Web3 = await web3();
    use_unstake(value, account, false, _web3)
      .on("transactionHash", (tx: any) => {
        console.log("trxn: ", tx);
        setTxnSubmittedMsg(`${tx}`);
        presentSubmitted();
        dismissTxnWaiting();
      })
      .once("receipt", (receipt: any) => {
        const event = receipt?.events;
        console.log("ReceiptEvents: ", event);
        dismissSubmitted();
        window.location.reload();
      })
      .on("error", (error: any) => {
        console.log("txn errors", error);
        setErrorMsg(error.message);
        presentError();
        dismissTxnWaiting();
      });
  };
  const stake = async (value: number) => {
    console.log("Number: ", value);
    presentTxnWaiting();
    const _web3: Web3 = await web3();
    use_stake(value, account, false, _web3)
      .on("transactionHash", (tx: any) => {
        console.log("trxn: ", tx);
        setTxnSubmittedMsg(`${tx}`);
        presentSubmitted();
        dismissTxnWaiting();
      })
      .once("receipt", (receipt: any) => {
        const event = receipt?.events;
        console.log("ReceiptEvents: ", event);
        dismissSubmitted();
        window.location.reload();
      })
      .on("error", (error: any) => {
        console.log("txn errors", error);
        setErrorMsg(error.message);
        presentError();
        dismissTxnWaiting();
      });
  };
  const [presentStake, dismissStake] = useIonModal(StakeCard, {
    onDismiss: handleDismiss,
    actionType,
    actionHandler: actionType === "stake" ? stake : unstake,
    approveHandler: approve,
    user,
    caliLPBusd: caliLPUsd,
    close: handleDismiss,
  });

  const claim = async () => {
    const _web3: Web3 = await web3();
    presentTxnWaiting();
    use_claim(account, _web3)
      .on("transactionHash", (tx: any) => {
        console.log("trxn: ", tx);
        setTxnSubmittedMsg(`${tx}`);
        presentSubmitted();
        dismissTxnWaiting();
      })
      .once("receipt", (receipt: any) => {
        const event = receipt?.events;
        console.log("ReceiptEvents: ", event);
        dismissSubmitted();
        window.location.reload();
      })
      .on("error", (error: any) => {
        console.log("txn errors", error);
        setErrorMsg(error.message);
        presentError();
        dismissTxnWaiting();
      });
  };
  const handleAction = (actType: string) => {
    setActionType(actType);
    presentStake();
  };
  return (
    <Container>
      <InnerContainer>
        <TopComponent>
          <TopHeader>Farming</TopHeader>
          <IonText>
            Stake your PancakeSwap CALI-BNB liquidity pool tokens to earn upto
            500% APY
          </IonText>
        </TopComponent>
        <CaliCard>
          <CaliCardheader>
            <CaliBNBIMG>
              <img src='/assets/images/caliLogo.png' />
            </CaliBNBIMG>
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
                  <b>20x</b>
                </h6>
              </IonChip>
            </CaliHeaderDetail>
          </CaliCardheader>
          <DetailsContainer>
            <Key>APR:</Key>
            <Value>{`${formatThousands(apr.toString())} %`}</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Key>Earn:</Key>
            <Value>CALI</Value>
          </DetailsContainer>
          <SmallContainer>
            <p style={{ padding: "0", margin: "0" }}>
              <strong>CALI Earned</strong>
            </p>
          </SmallContainer>
          <DetailsContainer>
            <Key>
              <b>{`${user ? `${formatThousands(user?.earnings)}` : "0.00"}`}</b>
              <small style={{ color: "#8169ae" }}>
                <b>{`~ ${
                  user
                    ? `${formartUSD(handleUSDValue(+user?.earnings, caliUsd))} `
                    : "0.00"
                }`}</b>
              </small>
            </Key>
            <IonButton
              onClick={claim}
              disabled={!account?.length || user?.earnings === "0"}
              size='small'>
              Harvest
            </IonButton>
          </DetailsContainer>
          {account && account.length ? (
            <>
              <SmallContainer>
                <p style={{ padding: "0", margin: "0" }}>
                  <strong>CALI-BNB Staked</strong>
                </p>
              </SmallContainer>
              <DetailsContainer style={{ paddingBottom: "0" }}>
                <Key>
                  <b>{`${formatThousands(user?.stakedBalance)}`}</b>
                  <small style={{ color: "#8169ae" }}>
                    <b>
                      {`~ ${formartUSD(
                        handleUSDValue(+user?.stakedBalance, caliLPUsd),
                      )}`}
                    </b>
                  </small>
                </Key>
                <StakeArea>
                  <StakeBtn
                    onClick={() => handleAction("stake")}
                    fill='outline'>
                    <Icon icon={addOutline} />
                  </StakeBtn>
                  <StakeBtn
                    onClick={() => handleAction("unstake")}
                    disabled={user?.stakedBalance === "0"}
                    fill='outline'>
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
                  <b>{`${formartUSD(totalLiquidityBusd)}`}</b>
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
      </InnerContainer>
    </Container>
  );
};

export default Farmcard;
