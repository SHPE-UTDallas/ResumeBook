import React from 'react';
import NavBar from '../../components/NavBar';
import {LinkedInLoginButton} from "react-social-login-buttons";
function App(props) {
  const classes = props.classes;
  
  return (
    <div className={classes.root}>
        <NavBar enableDrawer={false} classes={classes}/>
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <a href="/.netlify/functions/auth/linkedin">
                <LinkedInLoginButton />
            </a>
        </div>
    </div>
  );
}
export default App;

