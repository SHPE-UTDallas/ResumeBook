import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'
import store from '../../redux/store'
import isAuthenticated from '../../utils/auth/isAuthenticated'

function App(props) {
  const classes = props.classes
  //TODO: Does hitting the cancel button in the linkedin flow
  useEffect(() => {
    isAuthenticated().then(() => {
      const loggedIn = store.getState().auth.isAuthenticated
      const verified = store.getState().auth.isVerified
      localStorage.setItem('isLoggedIn', loggedIn)
      localStorage.setItem('verified', verified)
    })
  }, [])
  return (
    <div className={classes.root}>
      <NavBar enableDrawer={false} classes={classes} />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <h1>Login successful</h1>
      </div>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App
