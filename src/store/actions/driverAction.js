import { SET_BKD_DRIVER, SET_SC_DRIVER } from '../constants';

export const setBkdDriver = (data) => ({
    type: SET_BKD_DRIVER,
    payload: data,
});

export const setScDriver = (data) => ({
    type: SET_SC_DRIVER,
    payload: data,
});
