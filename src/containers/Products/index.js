import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';

import Layout from '../../components/Layout';
import ProductsTable from '../../components/products/ProductsTable';
import ProductDialog from '../../components/products/ProductDialog';
import Spinner from '../../components/Common/Spinner';
import { getProducts, createProduct } from '../../apis/products.api';
import './style.scss';

const productTableColumns = [
    {
        title: 'Image',
        key: 'image',
    },
    {
        title: 'Product Name',
        key: 'name',
    },
    {
        title: 'Price',
        key: 'price',
    },
    {
        title: 'Created At',
        key: 'createdAt',
    },
];

function ProductsPage() {
    const history = useHistory();
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);

    const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const showDetail = (id) => {
        history.push(`/products/${id}`);
    };

    const fetchProducts = useCallback(() => {
        setIsLoading(true);
        const query = {
            page,
            limit: pageSize,
            sortBy: 'id',
            order: 'DESC',
        };

        getProducts(query)
            .then((res) => {
                setProducts(res.data.products);
                setTotalCount(res.data.totalCount);
            })
            .catch((err) => {
                setProducts([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page, pageSize]);

    const handleCreate = (values) => {
        setIsLoading(true);
        setIsOpenCreateDialog(false);
        createProduct(values).then((res) => {
            fetchProducts();
        });
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, page, pageSize]);

    return (
        <Layout title="My Products">
            <div className="products-page">
                <div className="page-head">
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<AddCircleOutline />}
                        onClick={() => setIsOpenCreateDialog(true)}
                    >
                        Add
                    </Button>
                </div>

                <ProductsTable
                    columns={productTableColumns}
                    products={products}
                    onRowClick={showDetail}
                    page={page}
                    pageSize={pageSize}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    totalCount={totalCount}
                />

                <ProductDialog
                    open={isOpenCreateDialog}
                    onClose={() => setIsOpenCreateDialog(false)}
                    handler={handleCreate}
                />

                {isLoading && (
                    <div className="overlay">
                        <Spinner />
                    </div>
                )}
            </div>
        </Layout>
    );
}

ProductsPage.propTypes = {};

ProductsPage.defaultProps = {};

const mapStateToProps = (store) => ({});

export default connect(mapStateToProps)(ProductsPage);
