import React from "react";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { blockChainConfig } from "../../constants/blockChainConfig";
import { setMetaMask, deleteMetaMask } from "../../store/actions/web3action";
import { setNetwork } from "../../store/actions/web3action";

import UnlockButton from "./UnlockButton.jsx";
const selectedBlockChain =
  blockChainConfig[
    sessionStorage.getItem("selectedBlockChain")
      ? sessionStorage.getItem("selectedBlockChain")
      : 0
  ];

const {
  networkIdTestNet: networkIdTestNet,
  networkIdMainNet: networkIdMainNet,
  providerUrl,
} = selectedBlockChain;

const Web3 = require("web3");

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFlag: false,
      showSpinner: true,
      showWalletConnectDialog: false,
    };
  }

  addContract(calledFor, provider = null) {
    // let web3ForAliaPrice;
    if (
      calledFor === "metamask" &&
      Web3.givenProvider //&& // to do zou
      //Web3.givenProvider.networkVersion === networkIdTestNet && // to do zou
      //Web3.givenProvider.networkVersion === networkIdMainNet // to do zou
    ) {
      this.props.connectWallet(Web3.givenProvider);
    } else if (calledFor === "walletConnect") {
      this.props.connectWallet({ ...provider });
    }
  }

  clearReducer() {
    this.props.setMetaMask("");
  }

  async switchToCustomNetwork(ethereum){
    console.log(this.props.network);
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.props.network.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              { 
                chainName:this.props.network.chainName,
                chainId: this.props.network.chainId, 
                rpcUrls: [this.props.network.rpcUrl],
                nativeCurrency: this.props.network.nativeCurrency
              }
          ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }
  async connectWithWalletMetaMask(calledFor = "connected") {
    if (window.screen.width > 768) {
      let ethereum;
      console.log(window.ethereum);
      if (typeof window.ethereum !== "undefined") {
        ethereum = window.ethereum;
        console.log(ethereum.networkVersion+' '+parseInt(this.props.network.chainId, 16));
        if (ethereum.networkVersion !== parseInt(this.props.network.chainId, 16) /* networkIdTestNet */) {
          //return;
          await this.switchToCustomNetwork(ethereum)
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });


        localStorage.setItem("accounts", accounts[0]);
        localStorage.setItem("connectedWith", "metamask");
        localStorage.setItem("userConnected", true);

        if (accounts.length > 0) {
          // console.log("accounts", accounts[0]);
          this.props.setMetaMask(accounts[0]);
        }

        if (accounts.length === 0) {
          this.clearReducer();
        }

        ethereum.on("networkChanged", (accounts) => {
          // console.log(accounts);
          // this.clearReducer();
          this.addContract("metamask");
          this.props.setMetaMask("");
          if (accounts !== networkIdMainNet) {
          }
        });

        this.addContract("metamask");
      } else {
        this.clearReducer();
      }
    } else {
      return;
    }
  }

  async connectWithWalletConnect(provider) {
    localStorage.setItem("accounts", provider.accounts[0]);
    localStorage.setItem("connectedWith", "walletConnect");
    localStorage.setItem("userConnected", true);
    this.props.setMetaMask(provider.accounts[0]);
    this.addContract("walletConnect", provider);
  }

  connectWithWallet(calledFor) {
    if (calledFor === "metamask") {
      this.connectWithWalletMetaMask();
    }

    this.setState({ showWalletConnectDialog: false });
  }

  componentDidMount(prevProps) {
    const account = localStorage.getItem("accounts");
    const userlogout = localStorage.getItem("logout");

    setInterval(() => {
      let web3 = "";
      if (typeof window.ethereum !== "undefined") {
        web3 = new Web3(Web3.givenProvider);
      }
      if (web3 !== "") {
        web3.eth
          .getAccounts()
          .then((acc) => {
            if (
              acc.length === 0 &&
              localStorage.getItem("userConnected") === "true" &&
              localStorage.getItem("connectedWith") === "metamask"
            ) {
              localStorage.removeItem("userConnected");
              localStorage.removeItem("connectedWith");
              window.location.reload();
            }
          })
          .catch((e) => {
            // console.log(e);
          });
      }
    }, 1000);

    if (localStorage.getItem("userConnected") === "true") {
      setTimeout(() => {
        // document.getElementById("connectButton").click();
        const connectedWith = localStorage.getItem("connectedWith");
        if (connectedWith === "metamask") {
          this.connectWithWallet("metamask");
        } else if (connectedWith === "walletConnect") {
          this.connectWithWallet("walletConnect");
        }
      }, 700);
    }

    window.ethereum !== undefined &&
      window.ethereum.on("accountsChanged", (acc) => {
        if (this.props.metaMaskAddress !== "" && acc.length > 0) {
          this.props.handleLogout(false);
          this.clearReducer();
          this.connectWithWallet("metamask");
        }
      });

    if (!this.props.metaMaskAddress && !account && !userlogout) {
      this.setState({ showWalletConnectDialog: true });
    }
  }

  render() {
    window.ethereum !== undefined &&
      window.ethereum.on("accountsChanged", (acc) => {
        if (acc.length === 0) {
          this.props.handleLogout();
        }
      });

    return (
      <React.Fragment>
        <UnlockButton
          connectWithWalletConnect={this.connectWithWalletConnect.bind(this)}
          connectWithWallet={this.connectWithWallet.bind(this)}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  setMetaMask,
  deleteMetaMask,
  setNetwork,
};

const mapStateToProps = (state, ownProps) => {
  return {
    metaMaskAddress: state.web3.metaMaskAddress,
    network: state.web3.network,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
