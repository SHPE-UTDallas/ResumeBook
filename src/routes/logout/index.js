import React from 'react';
import NavBar from '../../components/NavBar';
import logout from '../../utils/auth/logout';

function App(props) {
  const classes = props.classes;
  logout();
  return (
    <div className={classes.root}>
        <NavBar enableDrawer={false} classes={classes}/>
        <div className={classes.content}>
            <div className={classes.toolbar} />
                <h1>Login successful</h1>
        </div>
    </div>
  );
}
export default App;

