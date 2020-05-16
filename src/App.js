import React, {useEffect} from 'react';
import './index.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import Home from './routes/index';
import Demo from './routes/demo/index';
import Resumes from './routes/resumes/index';
import Verify from './routes/verify/index';
import Login from './routes/login/index';
import LoginSuccess from './routes/login/success';
import Logout from './routes/logout/index';
import NoMatch from './routes/404';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import { green } from '@material-ui/core/colors';
import isAuthenticated from './utils/auth/isAuthenticated';
const drawerWidth = 300;
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
    }
  });
const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: cyan
    },
  });
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
      display: "inline",
      marginBottom: "-4px",
      marginRight: theme.spacing(1),
  },
  cartText: {
      display: "inline",
      marginRight: theme.spacing(1),
      fontSize:"1.5rem",
  },
  formEntry: {
      padding: "0",
      marginTop: "0px",
      marginBottom: "-10px",
  },
}));

const PrivateRoute = ({ render: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().auth.isVerified === true
      ? <Component {...props} />
      : store.getState().auth.isAuthenticated === true
        ? <Redirect to='/verify' /> 
        : <Redirect to ='/login' />
  )} />
)

const PrivateRoute2 = ({ render: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)


function App() {
  const classes = useStyles();
  useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <Provider store={store}>
        <MuiThemeProvider theme={defaultTheme}>
            <Router>
                <Route exact path="/" render={(routeProps) => <Home {...routeProps} classes={classes} />} />
                <Route exact path="/demo" render={(routeProps) => <Demo {...routeProps} classes={classes} />} />
                <PrivateRoute exact path="/resumes" render={(routerProps) => <Resumes {...routerProps} classes={classes} />} />
                <PrivateRoute2 exact path = "/verify" render={(routerProps) => <Verify {...routerProps} classes={classes} />} />
                <Route exact path="/login" render={(routerProps) => <Login {...routerProps} classes={classes} />} />
                <Route exact path="/login/success" render={(routerProps) => <LoginSuccess {...routerProps} classes={classes} />} />
                <Route exact path="/logout" render={(routerProps) => <Logout {...routerProps} classes={classes} />} />
                {/* <Route component={NoMatch} /> */}
            </Router>
        </MuiThemeProvider>
    </Provider>
    );
}
export default App;

