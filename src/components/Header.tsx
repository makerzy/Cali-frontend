import React, { useEffect } from "react";
import styled from "styled-components";
import { IonButton, IonChip } from "@ionic/react";
import { web3 as connect } from "hooks/useWeb3Provider";
import { useState } from "react";
import { useAccount } from "store/hook";
import { truncateWalletAddress } from "utils/help";
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const BottomContainer = styled.div`
  width: 100%;
  align-self: flex-end;
`;
const ConnectBtn = styled(IonButton)<{ color?: string }>`
  text-transform: capitalize;
  color: ${(props: any) => props.color};
  /* color: #f4f4f4; */
  --border-radius: 12px;
`;
const HeaderBar = () => {
  const [locked, setLocked] = useState<boolean>(true);
  const unlockWallet = async () => {
    await connect();
    setLocked(false);
  };
  const account = useAccount();
  if (account && locked) {
    setLocked(false);
    console.log("Account: ", account);
  }
  return (
    <HeaderContainer>
      <TopContainer>
        {!locked ? (
          <ConnectBtn fill='solid' color={"#fd3f92"} onClick={unlockWallet}>
            <b>Connect Wallet</b>
          </ConnectBtn>
        ) : (
          <IonChip>{truncateWalletAddress(account, 4, 6)}</IonChip>
        )}
      </TopContainer>
      <BottomContainer></BottomContainer>
    </HeaderContainer>
  );
};

export default HeaderBar;
