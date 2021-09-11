import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { web3 as connect } from "hooks/useWeb3Provider";
import { useAccount } from "store/hook";
import { truncateWalletAddress } from "utils/help";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr;
  align-items: center;
  width: 100%;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LogoMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const ConnectBtn = styled(IonButton)`
  text-transform: capitalize;
  --border-radius: 12px;
`;
const HeaderBar = () => {
  const [mQuey, setMQuery] = useState({
    matches: window.innerWidth > 760 ? true : false,
  });

  useEffect(() => {
    window.matchMedia("(min-width: 760px)").addListener(setMQuery);
  });
  const [locked, setLocked] = useState<boolean>(true);
  const unlockWallet = async () => {
    await connect();
    setLocked(false);
    window.location.reload();
  };
  const account = useAccount();
  if (account && locked) {
    setLocked(false);
    // console.log("Account: ", account);
  }
  return (
    <HeaderContainer>
      <LogoMenu>
        <IonMenuButton></IonMenuButton>
        <IonAvatar>
          <img src='/assets/svgs/caliLogo.svg' alt='' />
        </IonAvatar>
      </LogoMenu>
      <TopContainer>
        {locked ? (
          <ConnectBtn
            fill='solid'
            size='small'
            color='primary'
            onClick={unlockWallet}>
            <b>Connect Wallet</b>
          </ConnectBtn>
        ) : (
          <IonChip color='primary'>
            <b>{truncateWalletAddress(account, 4, 6)}</b>
          </IonChip>
        )}
      </TopContainer>
    </HeaderContainer>
  );
};

export default HeaderBar;
