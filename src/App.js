import React from 'react';
import './index.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import Home from './routes/index';
import Resume from './routes/resume/index';
import Login from './routes/login/index';
import NoMatch from './routes/404';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import { green } from '@material-ui/core/colors';

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
function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
        <MuiThemeProvider theme={defaultTheme}>
            <Router>
                <Route exact path="/" render={(routeProps) => <Home {...routeProps} classes={classes} />} />
                <Route exact path="/resume" render={(routeProps) => <Resume  {...routeProps} classes={classes} />} />
                <Route exact path="/login" render={(routerProps) => <Login {...routerProps} classes={classes} />} />
                {/* <Route component={NoMatch} /> */}
            </Router>
        </MuiThemeProvider>
    </Provider>
    );
}
export default App;

