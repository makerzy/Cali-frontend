import React from "react";
import {
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { BASE_ADD_LIQUIDITY_URL, BASE_EXCHANGE_URL } from "config";
import { getCaliAddress } from "utils/addressHelper";

const Menu: React.FC = () => {
  return (
    <IonMenu side='start' type='overlay' menuId='first' contentId='custom'>
      <IonHeader>
        <IonToolbar color='dark'>
          <IonTitle>Cali Farm</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem button href='https://calicoin.me/im-a-donor/'>
              <IonLabel>Donate to Charity</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem
              button
              href={`${BASE_ADD_LIQUIDITY_URL}${getCaliAddress()}`}>
              Add Liquidity
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem button href={`${BASE_EXCHANGE_URL}${getCaliAddress()}`}>
              Buy on Pancake
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem>Menu Item</IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
