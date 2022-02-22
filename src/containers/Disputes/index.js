import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Layout from '../../components/Layout';
import DisputesTable from '../../components/DisputesTable';
import { getDisputes } from '../../apis/disputs.api';
import Spinner from '../../components/Common/Spinner';

import './style.scss';

const DisputesColumns = [
    {
        title: 'Image',
        key: 'productimage',
    },
    {
        title: 'Product Name',
        key: 'productname',
    },
    {
        title: 'Price',
        key: 'productprice',
    },
    {
        title: 'Created At',
        key: 'createdAt',
    },
    {
        title: 'Status',
        key: 'status',
    },
];

const DisputesPage = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [disputes, setDisputes] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [totalCount, setTotalCount] = useState(0);

    const fetchDisputes = useCallback(() => {
        setIsLoading(true);
        const query = {
            page,
            limit: pageSize,
        };

        getDisputes(query)
            .then((res) => {
                setDisputes(res.data.disputes);
                setTotalCount(res.data.totalCount);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page, pageSize]);

    useEffect(() => {
        fetchDisputes();
    }, [fetchDisputes]);

    const showDetail = (id) => {
        history.push(`/disputes/${id}`);
    };

    return (
        <Layout title="Disputes">
            <div className="disputes-page">
                <DisputesTable
                    columns={DisputesColumns}
                    disputes={disputes}
                    onRowClick={showDetail}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    totalCount={totalCount}
                />

                {isLoading && (
                    <div className="overlay">
                        <Spinner />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default DisputesPage;
