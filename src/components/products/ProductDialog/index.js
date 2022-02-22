import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    FormControl,
    Input,
    InputAdornment,
} from '@material-ui/core';
import { ImageSearch } from '@material-ui/icons';
import Dropzone from 'react-dropzone';
import { Formik } from 'formik';
import * as Yup from 'yup';

import './style.scss';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter product name'),
    price: Yup.number().required('Please enter price'),
    shopAddress: Yup.string().required('Please enter address'),
    description: Yup.string().required('Please enter description'),
});

const ProductDialog = ({ open, onClose, handler, data }) => {
    const [image, setImage] = useState(null);

    const changeImage = (value) => {
        setImage(value[0]);
    };

    const initialValues = useMemo(
        () => ({
            name: data ? data.name : '',
            price: data ? data.price : '',
            shopAddress: data ? data.shopAddress : '',
            description: data ? data.description : '',
        }),
        [data]
    );

    const handleSave = (values) => {
        handler(values);
    };

    return (
        <Dialog open={open} onClose={onClose} className="product-dialog">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSave}
            >
                {({ values, errors, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <DialogContent>
                            <div className="product-head-info">
                                <Dropzone
                                    name="file"
                                    className="drop-zone"
                                    multiple={false}
                                    accept="image/*"
                                    onDrop={changeImage}
                                >
                                    {image ? (
                                        <img src={image.preview} alt="" />
                                    ) : (
                                        <ImageSearch />
                                    )}
                                </Dropzone>

                                <div className="form-field">
                                    <span className="label">Product Name:</span>
                                    <TextField
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />
                                </div>
                            </div>

                            <div className="form-field">
                                <span className="label">Product Price:</span>
                                <FormControl>
                                    <Input
                                        name="price"
                                        type="number"
                                        value={values.price}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                MTO
                                            </InputAdornment>
                                        }
                                        error={!!errors.price}
                                        helperText={errors.price}
                                    />
                                </FormControl>
                            </div>

                            <div className="form-field">
                                <span className="label">Product Address:</span>
                                <FormControl>
                                    <Input
                                        name="shopAddress"
                                        value={values.shopAddress}
                                        onChange={handleChange}
                                        error={!!errors.shopAddress}
                                        helperText={errors.shopAddress}
                                    />
                                </FormControl>
                            </div>
                            <div className="form-field">
                                <span className="label w-100">
                                    Description:
                                </span>
                                <TextField
                                    name="description"
                                    multiline
                                    rows={4}
                                    value={values.description}
                                    onChange={handleChange}
                                    variant="outlined"
                                    error={!!errors.description}
                                    helperText={errors.description}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions className="actions">
                            <Button onClick={onClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" autoFocus>
                                {data ? 'Update' : 'Create'}
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
};

ProductDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    handler: PropTypes.func,
    data: PropTypes.object,
};

ProductDialog.defaultProps = {
    open: false,
    onClose: () => {},
    handler: () => {},
    data: null,
};

export default ProductDialog;
