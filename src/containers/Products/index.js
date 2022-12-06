import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';

import Layout from '../../components/Layout';
import ProductsTable from '../../components/products/ProductsTable';
import ProductDialog from '../../components/products/ProductDialog';
import Spinner from '../../components/Common/Spinner';
// import { getProducts, createProduct } from '../../apis/products.api';
import './style.scss';
import { useSelector } from 'react-redux';


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
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);

    const showDetail = (id) => {
        history.push(`/products/${id}`);
    };

    const fetchProducts = useCallback(async () => {
        if (!bkdDriver || !bkdDriver.headers)
            return;
        setIsLoading(true);
        const query = {
            page,
            limit: pageSize,
            sortBy: 'id',
            order: 'DESC',
        };

        const res = await bkdDriver.getProducts(query);
        console.log('products', res);
        if (res) {
            setProducts(res.products);
            setTotalCount(res.totalCount);
        } else {
            setProducts([]);
        }
        setIsLoading(false);
    }, [page, pageSize, bkdDriver]);

    const handleCreate = async (values) => {
        if (!bkdDriver || !bkdDriver.headers)
        return;
        setIsLoading(true);
        setIsOpenCreateDialog(false);

        await bkdDriver.createProduct(values);
        fetchProducts();
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
                    setIsLoading={setIsLoading}
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
