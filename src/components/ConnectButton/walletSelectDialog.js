import React, { useState } from 'react';
import walletconnect from '../../assets/images/walletconnect.png';
import metamask from '../../assets/images/metamask.png';

import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

function WalletSelectDialog(props) {
    const [show] = useState(false);

    return (
        <>
            <Dialog
                onClose={() => props.hideShow()}
                open={!show}
                fullscreen={true}
                size={'sm'}
            >
                <DialogContent style={{ width: 400 }}>
                    <div
                        className="col-sm-12 cta-"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            flexDirection: 'column',
                        }}
                        onClick={() => props.connectWithWallet('metamask')}
                    >
                        <img
                            src={metamask}
                            alt=""
                            style={{ width: 130, height: 130 }}
                        />
                        <h5 style={{ fontWeight: 'bold' }}> MetaMask</h5>
                    </div>
                    <hr />
                    <div
                        className=" cta- col-sm-12"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            flexDirection: 'column',
                        }}
                        onClick={() => props.connectWithWallet('walletConnect')}
                    >
                        <img
                            src={walletconnect}
                            alt=""
                            className="wallet"
                            style={{ width: 150, height: 155 }}
                        />
                        <h5 style={{ fontWeight: 'bold' }}>Wallet Connect</h5>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default React.memo(WalletSelectDialog);
