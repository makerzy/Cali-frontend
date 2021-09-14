import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
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
import { BASE_ADD_LIQUIDITY_URL, BASE_EXCHANGE_URL } from "config";
import { getCaliAddress } from "utils/addressHelper";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr;
  align-items: center;
  width: 100%;

  /* background-color: #1c2126; */
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 20px;
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
const HeaderMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const HeaderMenuItem = styled(IonButton)``;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 20px;
`;

const HeaderBar = () => {
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 700 ? true : false,
  });

  useEffect(() => {
    window.matchMedia("(min-width: 700px)").addListener(setMQuery);
  }, [mQuery]);
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
        {!mQuery?.matches && <IonMenuButton color='light'></IonMenuButton>}
        <Avatar>
          <img src='/assets/svgs/caliLogo.svg' alt='' />
        </Avatar>
      </LogoMenu>
      <TopContainer>
        {mQuery?.matches && (
          <HeaderMenu>
            <HeaderMenuItem
              href='https://calicoin.me/im-a-donor/'
              color='light'
              fill='clear'>
              Donate&nbsp;
              <IonIcon src='/assets/svgs/give.svg' />
            </HeaderMenuItem>
            <HeaderMenuItem
              href={`${BASE_ADD_LIQUIDITY_URL}${getCaliAddress()}`}
              color='light'
              fill='clear'>
              Add Liquidity
            </HeaderMenuItem>
            <HeaderMenuItem
              href={`${BASE_EXCHANGE_URL}${getCaliAddress()}`}
              color='light'
              fill='clear'>
              Buy on Pancake
            </HeaderMenuItem>
          </HeaderMenu>
        )}
        {locked ? (
          <ConnectBtn
            fill='solid'
            size='small'
            color='light'
            onClick={unlockWallet}>
            <b>Connect Wallet</b>
          </ConnectBtn>
        ) : (
          <IonChip color='light'>
            <b>{truncateWalletAddress(account, 4, 6)}</b>
          </IonChip>
        )}
      </TopContainer>
    </HeaderContainer>
  );
};

export default HeaderBar;
