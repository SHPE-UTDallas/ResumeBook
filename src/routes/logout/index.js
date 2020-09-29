import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'
import logout from '../../utils/auth/logout'
import Footer from '../../components/Footer'

function App(props) {
  const classes = props.classes
  useEffect(() => {
    logout()
    localStorage.setItem('isLoggedIn', false)
    localStorage.setItem('verified', false)
  }, [])
  return (
    <div className={classes.root}>
      <NavBar enableDrawer={false} classes={classes} />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <h1>Logout successful</h1>
      </div>
      <Footer />
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App
