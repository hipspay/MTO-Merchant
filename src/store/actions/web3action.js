import {
    SET_WEB3_STATE,
    CLEAR_WEB3_STATE,
    Web_3_Object,
    WEB_3_CONNECTED,
    SET_META_MASK_ADDRESS,
    DELETE_META_MASK_ADDRESS,
    SET_NETWORK,
} from '../constants';

export function clearWeb3Data(payload) {
    return {
        type: CLEAR_WEB3_STATE,
        payload,
    };
}

export function setWeb3Data(payload) {
    return {
        type: SET_WEB3_STATE,
        payload,
    };
}

export const setMetaMask = (content) => ({
    type: SET_META_MASK_ADDRESS,
    payload: content,
});

export const setNetwork = (content) => ({
    type: SET_NETWORK,
    payload: content,
});

export const deleteMetaMask = () => ({ type: DELETE_META_MASK_ADDRESS });

export function Web3Object(value) {
    return {
        type: Web_3_Object,
        payload: value,
    };
}

export function web3Connected(value) {
    return {
        type: WEB_3_CONNECTED,
        payload: value,
    };
}
// export default {Web3Object, web3Connected};
