import React from 'react';
import { Button} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

function App(props) {
  const classes = props.classes;
  return (
    <div className={classes.content}>
        <div className={classes.toolbar} />
            <Button variant="contained" color="primary" to="/demo" component={RouterLink}>Demo</Button>
            <Button variant="contained" color="primary" to="/resumes" component={RouterLink}>Sponsor</Button>
    </div>
  );
}
export default App;

