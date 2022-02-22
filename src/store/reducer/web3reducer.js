import {
    SET_WEB3_STATE,
    CLEAR_WEB3_STATE,
    Web_3_Object,
    WEB_3_CONNECTED,
    SET_META_MASK_ADDRESS,
    DELETE_META_MASK_ADDRESS,
    SET_NETWORK,
} from '../constants';

const initialState = {
    web3object: undefined,
    metaMaskAddress: '',
    web3connected: false,
    network: {},
};

const web3Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WEB3_STATE:
            return {
                ...state,
                ...action.payload,
            };
        case CLEAR_WEB3_STATE:
            return {
                ...state,
                ...action.payload,
            };
        case Web_3_Object:
            return {
                ...state,
                web3object: action.payload,
            };
        case WEB_3_CONNECTED:
            return {
                ...state,
                web3connected: action.payload,
            };

        case SET_META_MASK_ADDRESS:
            return {
                ...state,
                metaMaskAddress: action.payload,
            };

        case SET_NETWORK:
            return {
                ...state,
                network: action.payload,
            };

        case DELETE_META_MASK_ADDRESS:
            return {
                ...state,
                metaMaskAddress: '',
            };

        default:
            return state;
    }
};
export default web3Reducer;
