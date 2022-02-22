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
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import './style.scss';

const DisputesTable = ({
    disputes,
    columns,
    onRowClick,
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
        setPageSize(+event.target.value);
        setPage(1);
    };

    return (
        <Paper className="disputes-table">
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
                        Total My disputes:
                        <strong>{totalCount}</strong>
                    </p>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell key={index}>
                                    {column.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {disputes.map((dispute) => (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={dispute.id}
                                onClick={() => onRowClick(dispute.id)}
                            >
                                {columns.map((column, index) => {
                                    const value = dispute[column.key];
                                    return (
                                        <TableCell
                                            className="table-cell"
                                            key={index}
                                        >
                                            {column.key === 'productimage' ? (
                                                <img
                                                    src={value}
                                                    alt=""
                                                />
                                            ) : (
                                                <>
                                                    {column.key === 'status' ? (
                                                        <span
                                                            className={value.toLowerCase()}
                                                        >
                                                            {value}
                                                        </span>
                                                    ) : (
                                                        <span>{value}</span>
                                                    )}
                                                </>
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
                rowsPerPageOptions={[5, 10, 15]}
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

DisputesTable.propTypes = {
    disputes: PropTypes.array,
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

DisputesTable.defaultProps = {
    disputes: [],
    columns: [],
    onRowClick: () => {},
    page: 1,
    setPage: () => {},
    pageSize: 10,
    setPageSize: () => {},
    keyword: '',
    setKeyword: () => {},
    totalCount: 0,
};

export default DisputesTable;
