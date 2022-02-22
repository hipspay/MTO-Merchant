import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import { useWeb3React } from '@web3-react/core';
import WalletSelectDialog from './walletSelectDialog';

const UnlockButton = (props) => {
    const { login } = useAuth();
    const { library } = useWeb3React();
    const disconnect = localStorage.getItem('disconnect');
    // const userConnected = localStorage.getItem("userConnected");

    // const [showWalletConnectDialog, setShowWalletConnectDialog] = useState(disconnect ? false : true);
    const [showWalletConnectDialog, setShowWalletConnectDialog] =
        useState(false);

    useEffect(() => {
        if (disconnect) {
            setTimeout(() => {
                localStorage.removeItem('disconnect');
            }, 3000);
        }
        if (typeof library !== 'undefined') {
            console.log('library', library);
            props.connectWithWalletConnect(library);
        }
    }, [library, disconnect]);

    function connectWithWallet(calledFor) {
        if (calledFor === 'walletConnect') {
            let success = login();
            if (!success) {
                setShowWalletConnectDialog(false);
            }
            return;
        }
        props.connectWithWallet(calledFor);
        setShowWalletConnectDialog(false);
    }

    useEffect(() => {
        if (
            localStorage.getItem('userConnected') === 'true' &&
            localStorage.getItem('connectedWith') === 'walletConnect'
        ) {
            login();
        }
    }, [login]);

    return (
        <>
            <button
                className="connect-btn"
                onClick={() => setShowWalletConnectDialog(true)}
                id="connectButton"
            >
                Connect Wallet
            </button>

            {showWalletConnectDialog ? (
                <WalletSelectDialog
                    show={showWalletConnectDialog}
                    hideShow={() => setShowWalletConnectDialog(false)}
                    connectWithWallet={connectWithWallet}
                />
            ) : undefined}
        </>
    );
};

export default React.memo(UnlockButton);
