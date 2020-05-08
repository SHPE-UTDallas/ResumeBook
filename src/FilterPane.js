import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import FormGroup from '@material-ui/core/FormGroup';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green';
import MediaQuery from 'react-responsive';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Table from './Table';

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

const greenTheme = createMuiTheme({ palette: { primary: green } })
function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
        <Box ml={1}>
            <h2>Filter Options</h2>
            <Box ml={1}>
                <FormGroup>
                    <Grid item xs={12}>
                        <h3 style={{marginTop: "0px", marginBottom: "0px"}}>GPA:</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel 
                            label="Minimum GPA:"
                            labelPlacement="start"
                            control={<input className={classes.title} type="number" onChange={handleChange} id="quantity" name="quantity" step="0.1" min="0" max="4" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{marginBottom: "0px"}}>Standing</h3>
                    </Grid>
                    <div className={classes.formEntry}>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Graduate Student"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Senior"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Junior"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Sophomore"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Freshman"
                            />
                        </Grid>
                    </div>
                    <Grid item xs={12}>
                        <h3 style={{marginBottom: "0px"}}>Major</h3>
                    </Grid>
                    <div className={classes.formEntry}>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Biomedical Engineering"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Computer Engineering"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Computer Science"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Electrical Engineering"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Mechanical Engineering"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Software Engineering"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel className={classes.formEntry}
                                control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                                label="Other"
                            />
                        </Grid>
                    </div>
                </FormGroup>
            </Box>
        </Box>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <AppBar className={classes.appBar} color="default" position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                
                {<img style={{width: "40x", height: "40px"}} src="https://i0.wp.com/www.shpesd.org/wp-content/uploads/2020/02/cropped-SHPE_logo_vert_SanDiegoPro_CMYK_HalfSize.png?fit=512%2C512"/>}
                <Typography className={classes.title} variant="h6" mx="auto">
                 SHPE
                </Typography>
                
                <Box ml="auto">
                    <Typography className={classes.cartText}>0</Typography>
                    <ShoppingCartIcon className={classes.cart}/>
                    <MuiThemeProvider theme={greenTheme}>
                        <Button variant="contained" color="primary">Login</Button>
                    </MuiThemeProvider>
                </Box>
            </Toolbar>
        </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
              
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <MediaQuery maxWidth={600}>
            {console.log("Hello)")}
                    <p>Hello</p>
            </MediaQuery>
            <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1 style={{textAlign: "center"}}>Members</h1>
        <Table/>
      </main>
            
    </div>
  );
}


export default ResponsiveDrawer;
