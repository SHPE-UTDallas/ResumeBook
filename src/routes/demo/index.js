import React from 'react'
import PropTypes from 'prop-types'
import FilterPane from '../../components/FilterPane'
import NavBar from '../../components/NavBar'
import Table from '../../components/Table'
import { ENDPOINT } from '../../utils/config'

function App(props) {
  const classes = props.classes
  const endpoint_url = `${ENDPOINT}/dummydata`
  return (
    <div className={classes.root}>
      <NavBar enableDrawer={true} classes={classes} />
      <FilterPane classes={classes} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1 style={{ textAlign: 'center' }}>Members</h1>
        <Table url={endpoint_url} classes={classes} data={[]} />
      </main>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App
