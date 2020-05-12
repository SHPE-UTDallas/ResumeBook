import React from 'react';
import { Button} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/resume" {...props} />
  ));

function App(props) {
  const classes = props.classes;
  return (
    <div className={classes.content}>
        <div className={classes.toolbar} />
            <Button variant="contained" color="primary" to="/resume" component={RouterLink}>Demo</Button>
        <Button variant="contained" color="primary">Sponsor</Button>
    </div>
  );
}
export default App;

