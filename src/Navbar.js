import React from 'react';
import { AppBar, IconButton, Toolbar, Button, Typography } from '@material-ui/core';
import MenuIcon  from '@material-ui/icons/Menu';
import { makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme) => ({
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
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
}));

const blueTheme = createMuiTheme({ palette: { primary: green } })

export default function NavBar() {
        const classes = useStyles();
        return(
        <AppBar className={classes.appBar} color="default" position="fixed">
            <Toolbar>
                <IconButton edge="start"  color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                {<img style={{width: "40x", height: "40px"}} src="https://i0.wp.com/www.shpesd.org/wp-content/uploads/2020/02/cropped-SHPE_logo_vert_SanDiegoPro_CMYK_HalfSize.png?fit=512%2C512"/>}
                <Typography className={classes.title} variant="h6" mx="auto">
                 SHPE
                </Typography>
                
                <Box ml="auto">
                    <Typography className={classes.cartText}>0</Typography>
                    <ShoppingCartIcon className={classes.cart} fontSize="medium"/>
                    <MuiThemeProvider theme={blueTheme}>
                        <Button variant="contained" color="primary">Login</Button>
                    </MuiThemeProvider>
                </Box>
            </Toolbar>
        </AppBar>);
}
