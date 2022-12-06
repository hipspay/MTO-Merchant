import { SET_BKD_DRIVER, SET_SC_DRIVER } from '../constants';

const initialState = {
    bkdDriver: null,
    scDriver: null,
};
const driverReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BKD_DRIVER:
            return {
                ...state,
                bkdDriver: action.payload,
            };
        case SET_SC_DRIVER:
            return {
                ...state,
                scDriver: action.payload,
            };
        default:
            return state;
    }
};
export default driverReducer;
