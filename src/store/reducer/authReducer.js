import {
    SET_USER_DATA,
    SET_USER_DATA_LOADER,
    SET_USER_NFTS,
} from '../constants';

const initialState = {
    userData: {},
    nfts: [],
    exploreNfts: [],
    isUserDataLoading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA_LOADER:
            return {
                ...state,
                isUserDataLoading: action.payload,
            };

        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
                isUserDataLoading: false,
            };

        case SET_USER_NFTS:
            return {
                ...state,
                nfts: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;
