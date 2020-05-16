import React from 'react';
import FilterPane from '../../components/FilterPane';
import NavBar from '../../components/NavBar';
import Table from '../../components/Table';
function App(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <NavBar enableDrawer={true} classes={classes}/>
      <FilterPane classes={classes} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1 style={{textAlign: "center"}}>Members</h1>
        <Table url='/.netlify/functions/dummydata' data={[]}/>
      </main>
    </div>
  );
}
export default App;

