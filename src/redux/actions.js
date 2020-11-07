import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  STORE_DATA_FROM_API,
  ADD_FILTER,
  REMOVE_FILTER,
  INCREASE_GPA,
  DECREASE_GPA,
  SORT_TABLE,
  FILTER_NAME_ADD,
  FILTER_NAME_DEL,
  TOGGLE_DRAWER,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  // TOGGLE_THEME,
} from './actionTypes'

export const addToCart = (users) => ({
  type: ADD_TO_CART,
  payload: {
    users,
  },
})

export const removeFromCart = (users) => ({
  type: REMOVE_FROM_CART,
  payload: {
    users,
  },
})

export const addFilter = (filter, category) => ({
  type: ADD_FILTER,
  payload: {
    filter,
    category,
  },
})

export const removeFilter = (filter, category) => ({
  type: REMOVE_FILTER,
  payload: {
    filter,
    category,
  },
})

export const storeDataFromAPI = (data) => ({
  type: STORE_DATA_FROM_API,
  payload: {
    data,
  },
})

export const increaseGPA = (num) => ({
  type: INCREASE_GPA,
  payload: {
    num,
  },
})

export const decreaseGPA = (num) => ({
  type: DECREASE_GPA,
  payload: {
    num,
  },
})

export const sortTable = (category, direction) => ({
  type: SORT_TABLE,
  payload: {
    category,
    direction,
  },
})

export const filterNameAdd = (search) => ({
  type: FILTER_NAME_ADD,
  payload: {
    search,
  },
})

export const filterNameDel = (search) => ({
  type: FILTER_NAME_DEL,
  payload: {
    search,
  },
})

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
})

export const loginSuccess = (verified, officer) => ({
  type: LOGIN_SUCCESS,
  payload: {
    verified,
    officer,
  },
})

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
})
