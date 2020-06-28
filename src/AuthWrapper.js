import isAuthenticated from './utils/auth/isAuthenticated'
import App from './App'
import React from 'react'
// Parent
class AuthWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authVerified: false,
    }
  }

  componentDidMount() {
    isAuthenticated().then(() => {
      this.setState({
        authVerified: true,
      })
    })
  }

  render() {
    if (this.state.authVerified) {
      return <App />
    } else {
      return null
    }
  }
}

export default AuthWrapper
