import { ADD_TO_CART, REMOVE_FROM_CART } from '../actionTypes'

const initialState = {
  numInCart: 0,
  users: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { users } = action.payload
      return {
        ...state,
        users: [...state.users, users],
        numInCart: state.numInCart + 1,
      }
    }
    case REMOVE_FROM_CART: {
      const { users } = action.payload
      const idex = state.users.indexOf(users)
      return {
        ...state,
        users: [...state.users.slice(0, idex), ...state.users.slice(idex + 1)],
        numInCart: state.numInCart - 1,
      }
    }
    default:
      return state
  }
}
