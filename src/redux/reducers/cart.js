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
      const { user } = action.payload
      const idex = state.users.indexOf(user)
      const newArr = [...state.users]
      newArr.splice(idex, 1)
      return {
        ...state,
        users: newArr,
        numInCart: state.numInCart - 1,
      }
    }
    default:
      return state
  }
}
