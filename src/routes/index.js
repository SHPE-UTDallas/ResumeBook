import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
function App(props) {
  const classes = props.classes

  return (
    <div className={classes.root}>
      <NavBar enableDrawer={false} classes={classes} />
      <div className={classes.content + ' landing-content'}>
        <div className={classes.toolbar} />
        <LandingPage classes={classes} />
        <Footer />
      </div>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default App
