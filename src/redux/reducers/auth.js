import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actionTypes'

const initialState = {
  isAuthenticated: false,
  isVerified: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      let { verified } = action.payload
      verified = verified === true ? true : false
      return {
        ...state,
        isAuthenticated: true,
        isVerified: verified,
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        isVerified: false,
      }
    }
    default:
      return state
  }
}
