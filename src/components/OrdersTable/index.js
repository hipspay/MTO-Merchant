import React, { useState } from 'react';
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
    Button,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { parseDate } from '../../utils/index';
import { orderStatus, getOrderStatus } from '../../constants';

import './style.scss';

const OrdersTable = ({
    orders,
    columns,
    onRowClick,
    hasActions,
    withdraw,
    page,
    pageSize,
    setPage,
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

    const withdrawOrder = (e) => {
        e.preventDefault();
        e.stopPropagation();
        withdraw();
    };

    return (
        <Paper className="orders-table">
            <TableContainer className="table-container">
                <div className="table-header">
                    <div className="search-input">
                        <Search />
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder=" Search..."
                        />
                    </div>
                    <p className="Total-cnt">
                        Total My Orders:
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
                            {hasActions && <TableCell>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={order.id}
                                onClick={() => onRowClick(order.id)}
                            >
                                {columns.map((column, index) => {
                                    const value = order[column.key];
                                    return (
                                        <TableCell
                                            className="table-cell"
                                            key={index}
                                        >
                                            {column.key === 'productimage' ? (
                                                <img src={value} alt="" />
                                            ) : column.key === 'createdAt' ? (
                                                <span>{parseDate(value)}</span>
                                            ) : (
                                                <>
                                                    {column.key === 'status' ? (
                                                        <span
                                                            className={getOrderStatus(
                                                                order
                                                            )}
                                                        >
                                                            {
                                                                orderStatus[
                                                                    getOrderStatus(
                                                                        order
                                                                    )
                                                                ]
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span>{value}</span>
                                                    )}
                                                </>
                                            )}
                                        </TableCell>
                                    );
                                })}
                                {hasActions && (
                                    <TableCell className="table-cell">
                                        <Button
                                            variant="contained"
                                            onClick={withdrawOrder}
                                        >
                                            Withdraw
                                        </Button>
                                    </TableCell>
                                )}
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
                page={page-1}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangePageSize}
            />
        </Paper>
    );
};

OrdersTable.propTypes = {
    orders: PropTypes.array,
    columns: PropTypes.array,
    onRowClick: PropTypes.func,
    withdraw: PropTypes.func,
    hasActions: PropTypes.bool,
    page: PropTypes.number,
    setPage: PropTypes.func,
    pageSize: PropTypes.number,
    setPageSize: PropTypes.func,
    keyword: PropTypes.string,
    setKeyword: PropTypes.func,
    totalCount: PropTypes.number,
};

OrdersTable.defaultProps = {
    orders: [],
    columns: [],
    onRowClick: () => {},
    withdraw: () => {},
    hasActions: false,
    page: 1,
    setPage: () => {},
    pageSize: 10,
    setPageSize: () => {},
    keyword: '',
    setKeyword: () => {},
    totalCount: 0,
};

export default OrdersTable;
