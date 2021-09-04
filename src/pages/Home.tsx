import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Farmcard from "components/Farmcard";
import Header from "components/Header";
import HeaderBar from "components/Header";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader collapse='condense'>
        <IonToolbar>
          <HeaderBar />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Farmcard />
      </IonContent>
    </IonPage>
  );
};

export default Home;
