import { loginSuccess } from './redux/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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

  async componentDidMount() {
    if (JSON.parse(localStorage.getItem('isLoggedIn')) === true) {
      const verificationStatus =
        JSON.parse(localStorage.getItem('verified')) === true ? true : false
      const officerStatus =
        JSON.parse(localStorage.getItem('officer')) === true ? true : false
      await this.props.loginSuccess(verificationStatus, officerStatus)
    }
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
