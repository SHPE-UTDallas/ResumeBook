import { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import PropTypes from 'prop-types'

const greenTheme = createMuiTheme({
  palette: {
    primary: green,
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: 'white',
      },
    },
  },
})
const redTheme = createMuiTheme({
  palette: {
    primary: red,
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: 'white',
      },
    },
  },
})
function LoginLogout(props) {
  const login = props.loggedIn ? (
    <MuiThemeProvider theme={redTheme}>
      <Button variant="contained" component={NavLink} to="/logout" color="primary">
        Logout
      </Button>
    </MuiThemeProvider>
  ) : (
    <MuiThemeProvider theme={greenTheme}>
      <Button variant="contained" component={NavLink} to="/login" color="primary">
        Login
      </Button>
    </MuiThemeProvider>
  )
  return <Fragment>{login}</Fragment>
}

LoginLogout.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

export default LoginLogout
