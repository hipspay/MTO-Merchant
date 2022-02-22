import React from 'react';
import PropTypes from 'prop-types';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    IconButton,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { parseDate } from '../../../utils/index';

import './style.scss';

const ProductsTable = ({
    products,
    columns,
    onRowClick,
    page,
    setPage,
    pageSize,
    setPageSize,
    keyword,
    setKeyword,
    totalCount,
}) => {
    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangePageSize = (event) => {
        // setPageSize(+event.target.value + 1);
        // setPage(1);
        setPage(1);
        setPageSize(event.target.value);
    };

    return (
        <Paper className="product-table">
            <TableContainer className="table-container">
                <div className="table-header">
                    <div className="search-input">
                        <Search />
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search..."
                        />
                    </div>
                    <p className="total-cnt">
                        Total Products:
                        <strong>{totalCount}</strong>
                    </p>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell className="table-cell" key={index}>
                                    {column.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={product.id}
                                onClick={() => onRowClick(product.id)}
                            >
                                {columns.map((column, index) => {
                                    const value = product[column.key];
                                    return (
                                        <TableCell
                                            className="table-cell"
                                            key={index}
                                        >
                                            {column.key === 'image' ? (
                                                <img
                                                    src={value}
                                                    alt=""
                                                />
                                            ): column.key === 'createdAt' ? (
                                                <span>{parseDate(value)}</span>
                                            ) : (
                                                <span>{ column.key !== 'createdAt' ? value : parseDate(value) }</span>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
                rowsPerPage={pageSize}
                page={page - 1}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangePageSize}
            />
        </Paper>
    );
};

ProductsTable.propTypes = {
    products: PropTypes.array,
    columns: PropTypes.array,
    onRowClick: PropTypes.func,
    page: PropTypes.number,
    setPage: PropTypes.func,
    pageSize: PropTypes.number,
    setPageSize: PropTypes.func,
    keyword: PropTypes.string,
    setKeyword: PropTypes.func,
    totalCount: PropTypes.number,
};

ProductsTable.defaultProps = {
    products: [],
    columns: [],
    onRowClick: () => {},
    page: 1,
    setPage: () => {},
    pageSize: 5,
    setPageSize: () => {},
    keyword: '',
    setKeyword: () => {},
    totalCount: 0,
};

export default ProductsTable;
