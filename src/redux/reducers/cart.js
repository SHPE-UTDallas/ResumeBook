import { ADD_TO_CART, REMOVE_FROM_CART } from '../actionTypes'

const initialState = {
  ids: [],
  numInCart: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { userId } = action.payload
      return {
        ...state,
        ids: [...state.ids, userId],
        numInCart: state.numInCart + 1,
      }
    }
    case REMOVE_FROM_CART: {
      const { userId } = action.payload
      const index = state.ids.indexOf(userId)
      return {
        ...state,
        ids: [...state.ids.slice(0, index), ...state.ids.slice(index + 1)],
        numInCart: state.numInCart - 1,
      }
    }
    default:
      return state
  }
}
