import React from 'react';
import NavBar from '../../components/NavBar';
import {Grid, FormControlLabel} from '@material-ui/core';
function App(props) {
  const classes = props.classes;
  
  return (
    <div className={classes.root}>
        <NavBar enableDrawer={false} classes={classes}/>
        <div className={classes.content}>
            <div className={classes.toolbar} />
                <Grid 
                    container 
                    alignItems="center"
                    direction="column"
                    justify="center"
                    >
                    <h3>Please verify you account by inputting the code provided to you:</h3>
                </Grid>
        </div>
    </div>
  );
}
export default App;

