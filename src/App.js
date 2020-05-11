import React from 'react';
import FilterPane from './components/FilterPane';
import NavBar from './components/NavBar';
import {makeStyles} from '@material-ui/core/styles';

const drawerWidth = 300;
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
    
  <React.Fragment>
    <NavBar classes={classes}/>
    <FilterPane classes={classes} />
  </React.Fragment>);
}
export default App;

