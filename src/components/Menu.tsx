import React from "react";
import {
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

const Menu: React.FC = () => {
  return (
    <IonMenu side='start' type='overlay' menuId='first' contentId='custom'>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>Cali Farm</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem>Menu Item</IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem>Menu Item</IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem>Menu Item</IonItem>
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
