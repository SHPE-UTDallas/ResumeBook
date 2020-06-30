import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AuthWrapper from './AuthWrapper'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthWrapper />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
