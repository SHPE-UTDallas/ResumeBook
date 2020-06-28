import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'

function App (props) {
  const classes = props.classes
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
  classes: PropTypes.object.isRequired
}

export default App
