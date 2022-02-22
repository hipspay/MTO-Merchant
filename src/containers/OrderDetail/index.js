import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { useHistory } from 'react-router';

import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Spinner from '../../components/Common/Spinner';
import { orderStatus, getOrderStatus } from '../../constants';
import { getOrder } from '../../apis/orders.api';
import escrowABI from '../../constants/escrowABI.json';

import { parseDate } from '../../utils/index';

import './style.scss';

const OrderDetailPage = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState();
    const [remainTime, setRemainTime] = useState('');
    const history = useHistory();

    const [escrowContract, setEscrowContract] = useState('');

    const [escrowResult, setEscrowResult] = useState('');

    const { web3object, metaMaskAddress, web3connected } = useSelector(
        (state) => state.web3
    );
    React.useEffect(() => {
        if (web3connected) {
            const EscrowContract = new web3object.eth.Contract(
                escrowABI,
                process.env.REACT_APP_ESCROW_CONTRACT_ADDRESS
            );
            // getEscrowData(EscrowContract);
            setEscrowContract(EscrowContract);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3connected]);

    const getEscrowData = async (escrowContract) => {
        const res = await escrowContract.methods.escrows(data.escrowId).call();
        if (res) {
            setEscrowResult(res);
        }
        console.log('EscrowContract', res);
    };

    useEffect(() => {
        if (escrowContract && data) {
            getEscrowData(escrowContract);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [escrowContract, data]);

    useEffect(() => {
        if (!data) {
            return;
        }

        const deadline = new Date(data.deliveryTime).getTime();
        const timer = setInterval(() => {
            const seconds = (deadline - new Date().getTime()) / 1000;
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            minutes %= 60;
            const days = Math.floor(hours / 24);
            hours %= 24;
            setRemainTime(
                `${days > 0 ? days : 0}d: ${hours > 0 ? hours : 0}h: ${
                    minutes > 0 ? minutes : 0
                }m`
            );
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [data]);

    const getOrderData = () => {
        const id = history.location.pathname.split('/orders/')[1];
        getOrder(id)
            .then((res) => {
                setData(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        getOrderData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const withdrawOrder = async () => {
        setIsLoading(true);
        try {
            const result = await escrowContract.methods
                .withdraw(data.escrowId)
                .send({ from: metaMaskAddress });

            // getEscrowData(escrowContract);
            const { transactionHash: transactionHashPurchase } = result;
            const purchaseReceipt = await web3object.eth.getTransactionReceipt(
                transactionHashPurchase
            );
            const blockLog = purchaseReceipt.logs.filter(
                (elem) =>
                    elem.address ===
                    process.env.REACT_APP_ESCROW_CONTRACT_ADDRESS
            )[0];
            const pastEvents = await escrowContract.getPastEvents('allEvents', {
                fromBlock: blockLog.blockNumber,
                toBlock: blockLog.blockNumber,
            });
            console.log(pastEvents);
            getOrderData();
            setIsLoading(false);
        } catch (error) {
            console.log(error, 'error');
            setIsLoading(false);
        }
    };
    return (
        <Layout title="Order Detail">
            {data && (
                <div className="order-detail-page">
                    <div className="status">
                        <div className={`status-btn ${getOrderStatus(data)}`}>
                            {orderStatus[getOrderStatus(data)]}
                        </div>
                    </div>

                    <div className="main-info">
                        <div className="order-image">
                            <img src={data.product.image} alt="" />
                        </div>

                        <div className="order-name">
                            <p>{data.product.name}</p>
                            <p>{data.product.price} MTO</p>
                        </div>

                        {data.status !== 'Completed' && (
                            <div className="info">
                                {data.status === 'In delivery' ? (
                                    <p className="label">
                                        Delivery period will be ended in:
                                    </p>
                                ) : (
                                    <p className="label">
                                        Escrow period will be ended in:
                                    </p>
                                )}
                                <p>{remainTime}</p>
                            </div>
                        )}

                        <div className="info">
                            <p className="label">Purchased At:</p>
                            <p>{parseDate(data.createdAt)}</p>
                        </div>
                    </div>

                    <div className="info">
                        <p className="label">Description:</p>
                        <p>{data.product.description}</p>
                    </div>

                    <div className="info">
                        <p className="label">Location: </p>
                        <p>{data.product.shopAddress}</p>
                    </div>

                    <div className="info">
                        <p className="label">Buyer Info:</p>
                        <div className="merchant-info">
                            <Person />
                            <a className="merchant-name">
                                {data.product.merchant.name}
                            </a>
                        </div>
                    </div>

                    <div className="info align-items-start">
                        <div className="info-block">
                            <div className="info-item">
                                <span>Delivery period Ends On:</span>
                                <span>{parseDate(data.deliveryTime)}</span>
                            </div>

                            <div className="info-item">
                                <span>Withdraw period Ends On:</span>
                                <span>{parseDate(data.escrowTime)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="actions">
                        {escrowResult && data
                            ? escrowResult.status === '0' &&
                              new Date(
                                  parseInt(
                                      escrowResult.escrowWithdrawableTime
                                  ) * 1000
                              ).getTime() < new Date().getTime() && (
                                  <Button
                                      color="primary"
                                      variant="contained"
                                      onClick={withdrawOrder}
                                  >
                                      Withdraw
                                  </Button>
                              )
                            : null}
                    </div>

                    {isLoading && (
                        <div className="overlay">
                            <Spinner />
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
};

export default OrderDetailPage;
