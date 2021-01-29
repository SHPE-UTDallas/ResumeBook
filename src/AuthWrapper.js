import { loginSuccess } from './redux/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import App from './App'
import React from 'react'
import { ENDPOINT } from './utils/config'

// Parent
class AuthWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authVerified: false,
    }
  }

  async componentDidMount() {
    await fetch(`${ENDPOINT}/auth/loginStatus`).then(async (res) => {
      res = await res.json()
      await this.props.loginSuccess(res.verified, res.officer)
    })
    this.setState({ authVerified: true })
  }

  render() {
    if (this.state.authVerified) {
      return <App />
    } else {
      return null
    }
  }
}

AuthWrapper.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}

export default connect(null, { loginSuccess })(AuthWrapper)
