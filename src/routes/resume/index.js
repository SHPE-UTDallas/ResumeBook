import React from 'react';
import FilterPane from '../../components/FilterPane';
import NavBar from '../../components/NavBar';

function App(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <NavBar enableDrawer={true} classes={classes}/>
      <FilterPane classes={classes} />
    </div>
  );
}
export default App;

