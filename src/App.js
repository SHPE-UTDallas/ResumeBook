import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import store from './redux/store'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Home from './routes/index'
import Demo from './routes/demo/index'
import Resumes from './routes/resumes/index'
import Verify from './routes/verify/index'
import Login from './routes/login/index'
import LoginSuccess from './routes/login/success'
import Logout from './routes/logout/index'
import Upload from './routes/upload/index'
//import NoMatch from './routes/404'; TODO: Implement 404 page
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

const drawerWidth = 300
const defaultTheme = createMuiTheme({
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

/*
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
  },
})
*/

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    marginLeft: theme.spacing(1),
  },
  cart: {
    display: 'inline',
    marginBottom: '-4px',
    marginRight: theme.spacing(1),
  },
  cartText: {
    display: 'inline',
    marginRight: theme.spacing(1),
    fontSize: '1.5rem',
  },
  formEntry: {
    padding: '0',
    marginTop: '0px',
    marginBottom: '-10px',
  },
  searchBar: {
    marginBottom: theme.spacing(2),
    width: '25ch',
  },
}))

const PrivateRoute = ({ render: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      store.getState().auth.isVerified === true ? (
        <Component {...props} />
      ) : store.getState().auth.isAuthenticated === true ? (
        <Redirect to="/verify" />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

const PrivateRoute2 = ({ render: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      store.getState().auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

function App() {
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <Router>
        <Route
          exact
          path="/"
          render={(routeProps) => <Home {...routeProps} classes={classes} />}
        />
        <Route
          exact
          path="/demo"
          render={(routeProps) => <Demo {...routeProps} classes={classes} />}
        />
        <PrivateRoute
          exact
          path="/resumes"
          render={(routerProps) => <Resumes {...routerProps} classes={classes} />}
        />
        <PrivateRoute2
          exact
          path="/verify"
          render={(routerProps) => <Verify {...routerProps} classes={classes} />}
        />
        <Route
          exact
          path="/login"
          render={(routerProps) => <Login {...routerProps} classes={classes} />}
        />
        <Route
          exact
          path="/login/success"
          render={(routerProps) => <LoginSuccess {...routerProps} classes={classes} />}
        />
        <Route
          exact
          path="/logout"
          render={(routerProps) => <Logout {...routerProps} classes={classes} />}
        />
        <PrivateRoute2
          exact
          path="/upload"
          render={(routerProps) => <Upload {...routerProps} classes={classes} />}
        />
        {/* <Route component={NoMatch} /> */}
      </Router>
    </MuiThemeProvider>
  )
}

PrivateRoute.propTypes = {
  render: PropTypes.any.isRequired,
}

PrivateRoute2.propTypes = {
  render: PropTypes.any.isRequired,
}

export default App
