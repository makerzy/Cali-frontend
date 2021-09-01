import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import store from "store";

//  // Web3modal instance
let web3Modal;

//  // Chosen wallet provider given by the dialog window
let provider: any;

export const web3Provider = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "ae69348d48e148e79799e35958268f01",
        // smartChain: "https://data-seed-prebsc-1-s1.binance.org:8545/"
      },
    },
  };

  web3Modal = new Web3Modal({
    // network: "bsc", // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  try {
    provider = await web3Modal.connect();
    provider.on("connect", (info: { chainId: number }) => {
      console.log("connected: ", info);
    });
  } catch (e) {
    console.log("Could not get a wallet connection", e);
    return;
  }
  subscribeToEvents();
  const web3 = new Web3(provider);

  return web3;
};

const subscribeToEvents = async () => {
  provider.on("accountsChanged", (accounts: string) => {
    console.log("Account: ", accounts);
    store.dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
  });

  provider.on("connect", (info: { chainId: number }) => {
    console.log(info);
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId: any) => {
    console.log(chainId);
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId: any) => {
    store.dispatch({ type: "SET_NETWORK", payload: networkId });
  });

  await refreshAccountData();
};

const ethereum = window.ethereum;

export const refreshAccountData = async () => {
  const networkId = await ethereum.networkVersion;
  const accounts = await ethereum.request({ method: "eth_accounts" });

  if (accounts.length > 0) {
    store.dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
    store.dispatch({ type: "SET_NETWORK", payload: networkId });
  }
};
