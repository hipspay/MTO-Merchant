import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { useHistory } from 'react-router';

import Layout from '../../components/Layout';
import Spinner from '../../components/Common/Spinner';
import ConfirmDialog from '../../components/Common/ComfirmDialog';
// import { getDispute } from '../../apis/disputs.api';
import { parseDate } from '../../utils';
import { useSelector } from 'react-redux';

import './style.scss';

const DisputeDetailPage = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState();
    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
    const history = useHistory();
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);

    const getDisputeDetail = async () => {
        if (bkdDriver?.headers) {
            setIsLoading(true);
            const id = history.location.pathname.split('/disputes/')[1];
            const res = await bkdDriver.getDisputeById(id);
            setData(res);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getDisputeDetail();
    }, [history.location.pathname, bkdDriver]);

    const cancelDispute = () => {
        setIsLoading(true);
        setIsOpenConfirmDialog(false);
        setTimeout(() => {
            setIsLoading(false);
            history.push('/disputes');
        }, 5000);
    };

    const disputeWithDraw = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            history.push('/home');
        }, 5000);
    };

    return (
        <Layout title="Dispute">
            {data && (
                <div className="dispute-detail-page">
                    <div className="status">
                        <div
                            className={`status-btn ${data.status.toLowerCase()}`}
                        >
                            {data.status}
                        </div>
                    </div>

                    <div className="main-info">
                        <div className="product-image">
                            <img
                                src={data.order.product.image}
                                alt=""
                            />
                        </div>

                        <div className="product-name">
                            <p>{data.order.product.name}</p>
                            <p>
                                <strong>Price: </strong>
                                {data.order.product.price} MTO
                            </p>
                        </div>

                        <div className="info">
                            <p className="label">Dispute Created At:</p>
                            <p>{parseDate(data.createdAt)}</p>
                        </div>

                        <div className="info">
                            <p className="label">Purchased At</p>
                            <p>{parseDate(data.order.createdAt)}</p>
                        </div>
                    </div>

                    <div className="info">
                        <p className="label">Dispute Description</p>
                        <p>{data.description}</p>
                    </div>

                    <div className="info">
                        <p className="label">Buyer Info:</p>
                        <div className="merchant-info">
                            <Person />
                            <a className="merchant-name">
                                {data.order.product.merchant.name}
                            </a>
                        </div>
                    </div>

                    <div className="info align-items-end">
                        <div className="info-block">
                            <div className="info-item">
                                <span>Delivery period:</span>
                                <span>{parseDate(data.order.deliveryTime)}</span>
                            </div>

                            <div className="info-item">
                                <span>Escrow period:</span>
                                <span>{parseDate(data.order.escrowTime)}</span>
                            </div>
                        </div>
                        {(data.status === 'Init' ||
                            data.status === 'Waiting' ||
                            data.status === 'Review') && (
                            <div className="info-block">
                                <div className="info-item">
                                    <span>Agents in Review:</span>
                                    <span>{data.agentsInReview}</span>
                                </div>

                                <div className="info-item">
                                    <span>Agents in Approved:</span>
                                    <span>{data.agentsInApproved}</span>
                                </div>

                                <div className="info-item">
                                    <span>Agents in Disapproved:</span>
                                    <span>{data.agentsInDisapproved}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {data.status === 'Fail' && (
                        <p className="help-text">
                            <i>
                                Sorry, you got failed for this case. Buyer will
                                take funds back from an escrow pool.
                            </i>
                        </p>
                    )}

                    {data.status === 'Win' && (
                        <p className="help-text">
                            <i>
                                Congrats! You have won a dispute.
                                <br />
                                Please withdraw the funds from an escrow
                                contract.
                            </i>
                        </p>
                    )}

                    <div className="actions">
                        {data.status === 'Win' && (
                            <Button
                                className="win"
                                color="black"
                                variant="contained"
                                onClick={disputeWithDraw}
                            >
                                Withdraw
                            </Button>
                        )}
                    </div>

                    {isLoading && (
                        <div className="overlay">
                            <Spinner />
                        </div>
                    )}
                </div>
            )}

            <ConfirmDialog
                open={isOpenConfirmDialog}
                handler={cancelDispute}
                content="Are you sure to cancel this dispute?"
                onClose={() => setIsOpenConfirmDialog(false)}
            />
        </Layout>
    );
};

export default DisputeDetailPage;
