import React from 'react'
import NavBar from '../components/NavBar'
import LandingPage from '../components/LandingPage'

function App (props) {
  const classes = props.classes

  return (
    <div className={classes.root}>
      <NavBar enableDrawer={false} classes={classes} />
      <LandingPage classes={classes} />
    </div>
  )
}
export default App
