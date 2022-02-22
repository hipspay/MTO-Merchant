import {SET_CHAT_JWT, SET_MAIN_JWT} from "../constants";

export const setChatJWT = (jwt_token) => {
    return {
      type: SET_CHAT_JWT,
      payload: jwt_token,
    };
  };
  
  export const setMainJWT = (jwt_token) => {
    return {
      type: SET_MAIN_JWT,
      payload: jwt_token,
    };
  };