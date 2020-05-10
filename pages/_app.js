//   \_app.js
import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/redux'
import { Provider } from 'react-redux'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
    )
  }
}

export default withReduxStore(MyApp)