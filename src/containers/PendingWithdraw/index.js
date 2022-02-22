import React, { useState } from 'react';

import Layout from '../../components/Layout';
import Orders from '../../mock/orders.json';
import OrdersTable from '../../components/OrdersTable';
import './style.scss';
import { useHistory } from 'react-router';
import Spinner from '../../components/Common/Spinner';

const OrdersColumns = [
    {
        title: 'Image',
        key: 'product.image',
    },
    {
        title: 'Product Name',
        key: 'product.name',
    },
    {
        title: 'Price',
        key: 'product.price',
    },
    {
        title: 'Created At',
        key: 'createdAt',
    },
];

const PendingWithdrawPage = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState();

    const showDetail = (id) => {
        history.push(`/orders/${id}`);
    };

    const withdrawOrder = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            history.push('/home');
        }, 3000);
    };

    return (
        <Layout title="Pending Withdraw">
            <div className="pending-withdraw-page">
                <OrdersTable
                    columns={OrdersColumns}
                    orders={Orders}
                    onRowClick={showDetail}
                    withdraw={withdrawOrder}
                    hasActions
                />
            </div>
            {isLoading && (
                <div className="overlay">
                    <Spinner />
                </div>
            )}
        </Layout>
    );
};

export default PendingWithdrawPage;
