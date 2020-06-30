import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'
import logout from '../../utils/auth/logout'

function App(props) {
  const classes = props.classes
  useEffect(() => {
    logout()
  }, [])
  //TODO: Error handling, display an error message or inform the user if a logout is not successful
  return (
    <div className={classes.root}>
      <NavBar enableDrawer={false} classes={classes} />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <h1>Logout successful</h1>
      </div>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App
