import { combineReducers } from 'redux'
import cart from './cart'
import data from './data'
import auth from './auth'

export default combineReducers({ cart, data, auth })
