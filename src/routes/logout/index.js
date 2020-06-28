import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'
import logout from '../../utils/auth/logout'

function App (props) {
  const classes = props.classes
  logout()
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
  classes: PropTypes.object.isRequired
}

export default App
