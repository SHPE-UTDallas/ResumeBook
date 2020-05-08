import React from 'react';
import NavBar from './Navbar';
import FilterPane from './FilterPane';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lighten, makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Toolbar from '@material-ui/core/Toolbar';
import Table from './Table';
const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
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
  
  content: {
      flexGrow: 1,
      padding: theme.spacing(3),
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
  const drawerWidth="260px";
  const classes = useStyles();
  return (
  <React.Fragment>
  {/* //   <NavBar/> */}
    <FilterPane />
    
  </React.Fragment>);
}
export default App;

