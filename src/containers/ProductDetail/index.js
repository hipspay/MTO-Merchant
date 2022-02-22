import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import Layout from '../../components/Layout';
import ProductDialog from '../../components/products/ProductDialog';
import ConfirmDialog from '../../components/Common/ComfirmDialog';
import Spinner from '../../components/Common/Spinner';
import { parseDate } from '../../utils';

import {
    getProduct,
    updateProduct,
    removeProduct,
} from '../../apis/products.api';

import './style.scss';

const ProductDetailPage = () => {
    const history = useHistory();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

    const fetchData = useCallback(() => {
        setIsLoading(true);
        const id = history.location.pathname.split('/products/')[1];
        getProduct(id)
            .then((res) => {
                setData(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [history.location.pathname]);

    useEffect(() => {
        fetchData();
    }, [fetchData, history.location.pathname]);

    const update = (values) => {
        setIsEditMode(false);
        setIsLoading(true);
        updateProduct(data.id, values)
            .then((res) => {
                setData(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const remove = () => {
        setIsOpenConfirmDialog(false);
        setIsLoading(true);
        removeProduct(data.id).then(() => {
            setIsLoading(false);
            history.push('/products');
        });
    };

    return (
        <Layout title="Product">
            {data && (
                <div className="product-detail-page">
                    <div className="main-info">
                        <div className="product-image">
                            <img
                                src={data.image}
                                alt=""
                            />
                        </div>

                        <div className="d-flex">
                            <div className="product-name">
                                <p>
                                    <strong>{data.name}</strong>
                                </p>
                                <p>
                                    <strong>Price: </strong>
                                    {data.price} MTO
                                </p>
                            </div>

                            <div className="product-sold">
                                <p>
                                    <strong>Sold Out: </strong>
                                    {data.soldOutItems}{' '}
                                </p>
                            </div>
                        </div>

                        <div className="actions">
                            <IconButton onClick={() => setIsEditMode(true)}>
                                <Edit />
                            </IconButton>
                            <IconButton
                                onClick={() => setIsOpenConfirmDialog(true)}
                            >
                                <Delete />
                            </IconButton>
                        </div>
                    </div>

                    <div className="info">
                        <p className="label">Description:</p>
                        <p>{data.description}</p>
                    </div>

                    <div className="info">
                        <p className="label">Location:</p>
                        <p>{data.shopAddress}</p>
                    </div>

                    <div className="info">
                        <p className="label">Registered At:</p>
                        <p>{parseDate(data.createdAt)}</p>
                    </div>

                    {isLoading && (
                        <div className="overlay">
                            <Spinner />
                        </div>
                    )}
                </div>
            )}

            <ProductDialog
                open={isEditMode}
                onClose={() => setIsEditMode(false)}
                data={data}
                handler={update}
            />

            <ConfirmDialog
                open={isOpenConfirmDialog}
                onClose={() => setIsOpenConfirmDialog(false)}
                content="Are you sure to delete this product?"
                handler={remove}
            />
        </Layout>
    );
};

export default ProductDetailPage;
