import {SET_CHAT_JWT, SET_MAIN_JWT} from "../constants";
const initialState = {
    chatJWT: '',
    mainJWT: '',
  };
 const jwtReducer  = (state = initialState, action)=>{
     switch(action.type){
        case SET_CHAT_JWT:
             return {
                 ...state,
                 chatJWT:action.payload
             };
        case SET_MAIN_JWT:
            return { 
                ...state,
                mainJWT:action.payload
            };
        default:
            return state;         
     }
 } 
 export default jwtReducer;