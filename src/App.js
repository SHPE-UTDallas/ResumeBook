import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import store from './redux/store'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Home from './routes/index'
import Demo from './routes/demo/index'
import Resumes from './routes/resumes/index'
import Verify from './routes/verify/index'
import Login from './routes/login/index'
import Logout from './routes/logout/index'
import Upload from './routes/upload/index'
import Officer from './routes/officer/index'
import OfficerVerification from './routes/officer/verify'
import NoMatch from './routes/404'
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
    marginRight: theme.spacing(1),
  },
  cartText: {
    display: 'inline',
    fontSize: '1.5rem',
  },
  formEntry: {
    padding: '0',
    marginTop: '0px',
    // marginBottom: '-10px',
  },
  searchBar: {
    marginBottom: theme.spacing(2),
    width: '25ch',
  },
}))

const VerifiedRoute = ({ render: Component, ...rest }) => (
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

const LoggedInRoute = ({ render: Component, ...rest }) => (
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

const OfficerRoute = ({ render: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      store.getState().auth.isVerified === true ? (
        <Component {...props} />
      ) : store.getState().auth.isAuthenticated === true ? (
        <Redirect to="/officer/verify" />
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
        <Switch>
          {/*Look through all <Route> if path isn't found use last <Route>*/}
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
          <VerifiedRoute
            exact
            path="/resumes"
            render={(routerProps) => <Resumes {...routerProps} classes={classes} />}
          />
          <LoggedInRoute
            exact
            path="/verify"
            render={(routerProps) => <Verify {...routerProps} classes={classes} />}
          />
          <OfficerRoute
            exact
            path="/officer"
            render={(routerProps) => <Officer {...routerProps} classes={classes} />}
          />
          <LoggedInRoute
            exact
            path="/officer/verify"
            render={(routerProps) => (
              <OfficerVerification {...routerProps} classes={classes} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(routerProps) => <Login {...routerProps} classes={classes} />}
          />
          <Route
            exact
            path="/logout"
            render={(routerProps) => <Logout {...routerProps} classes={classes} />}
          />
          <Route
            exact
            path="/upload"
            render={(routerProps) => <Upload {...routerProps} classes={classes} />}
          />
          <Route
            render={(routerProps) => <NoMatch {...routerProps} classes={classes} />}
          />
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

VerifiedRoute.propTypes = {
  render: PropTypes.any.isRequired,
}

LoggedInRoute.propTypes = {
  render: PropTypes.any.isRequired,
}

OfficerRoute.propTypes = {
  render: PropTypes.any.isRequired,
}

export default App
