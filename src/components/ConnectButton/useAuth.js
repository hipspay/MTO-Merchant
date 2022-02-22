import { useCallback } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  // UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";

import { blockChainConfig } from "../../constants/blockChainConfig";
const selectedBlockChain =
  blockChainConfig[
    sessionStorage.getItem("selectedBlockChain")
      ? sessionStorage.getItem("selectedBlockChain")
      : 0
  ];

const {
  networkIdTestNet: networkIdTestNet,
  providerUrl,
} = selectedBlockChain;

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(() => {
    const connector = new WalletConnectConnector({
      rpc: {
        [networkIdTestNet]: providerUrl,
      },
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
      pollingInterval: 12000,
    });

    if (connector) {
      activate(connector, async (error) => {
        try {
          if (error instanceof UnsupportedChainIdError) {
            // const hasSetup = await setupNetwork()
            // if (hasSetup) {
            // console.log(error);
            window.localStorage.removeItem("walletconnect");
            return false;
            // activate(connector);
            // }
          } else {
            // console.log("error whileactivating connecting", error);
            return false;

            // window.localStorage.removeItem(connectorLocalStorageKey)
            // if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            // } else if (
            //   error instanceof UserRejectedRequestErrorInjected ||
            //   error instanceof UserRejectedRequestErrorWalletConnect
            // ) {
            //   if (connector instanceof WalletConnectConnector) {
            //     const walletConnector = connector as WalletConnectConnector
            //     walletConnector.walletConnectProvider = null
            //   }
            // } else {
            // }
          }
        } catch (err) {
          // console.log(err);
        }
      });
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { login, logout: deactivate };
};

export default useAuth;
