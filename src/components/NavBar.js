import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Cart from './CartNavBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { connect } from 'react-redux';
import {toggleDrawer} from '../redux/actions';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import red from '@material-ui/core/colors/red';
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
    }
  });



function NavBar(props) {
    const classes = props.classes;
    const handleDrawerToggle = () => {
        props.toggleDrawer();
      };
    const enableDrawerMenu = props.enableDrawer ? 
        (<IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
        >
            <MenuIcon />
        </IconButton>) :
        '';

    return(
        <React.Fragment>
            <CssBaseline />
            <AppBar className={classes.appBar} color="default" position="fixed">
                <Toolbar>
                    {enableDrawerMenu}
                    {<img style={{width: "40x", height: "40px"}} alt="SHPE logo"src="https://i0.wp.com/www.shpesd.org/wp-content/uploads/2020/02/cropped-SHPE_logo_vert_SanDiegoPro_CMYK_HalfSize.png?fit=512%2C512"/>}
                    <Typography className={classes.title} variant="h6">
                        SHPE
                    </Typography>
                    <Typography component={NavLink} to='/'>
                        Home
                    </Typography>
                    <Box ml="auto">
                        <Cart classes={classes}/>
                        <MuiThemeProvider theme={greenTheme}>
                            <Button variant="contained" component={NavLink} to='/login' color="primary">Login</Button>
                        </MuiThemeProvider>
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    enableDrawer: PropTypes.bool.isRequired
}



const mapStateToProps = state => {
    const {mobileOpen} = state.data;
    return {mobileOpen: mobileOpen};
}


export default connect(mapStateToProps, {toggleDrawer})(NavBar);