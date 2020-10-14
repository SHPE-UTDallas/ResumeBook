import React from 'react'
import Navbar from '../../components/NavBar'
import Table from '../../components/CartTable'
import PropTypes from 'prop-types'

function App(props) {
  const classes = props.classes
  return (
    <>
      <Navbar enableDrawer={false} classes={classes} />
      <div className={classes.toolbar} />
      <div style={{ justifyContent: 'center' }} className={classes.root}></div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1 style={{ textAlign: 'center' }}>Members</h1>
        <Table classes={classes} />
      </main>
    </>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App
