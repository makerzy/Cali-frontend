import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useDispatch, useSelector } from "react-redux";
import Home from "pages/Home";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "./App.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Menu from "components/Menu";

const App: React.FC = () => {
  const account = useSelector((state: any) => state.user.account);
  const dispatch = useDispatch();

  const ethereum = window.ethereum;
  const loadBlockchainData = async () => {
    const accounts =
      ethereum && (await ethereum.request({ method: "eth_accounts" }));
    const networkId = ethereum && (await ethereum.networkVersion);
    if (accounts && accounts.length > 0) {
      dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
      dispatch({ type: "SET_NETWORK", payload: networkId });
    }
  };

  useEffect(() => {
    loadBlockchainData();
    // console.log("Account: ", account);
    // window.location.reload();
  }, [account]);

  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <IonRouterOutlet id='custom'>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
