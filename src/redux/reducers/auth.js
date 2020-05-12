import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actionTypes";

const initialState = {
  isAuthenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
       isAuthenticated: true
      };
    }
    case LOGOUT_SUCCESS: {
      
      return {
        ...state,
        isAuthenticated: false
        };
    }
    default:
      return state;
  }
}
