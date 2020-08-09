import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'
import { ENDPOINT } from '../../utils/config'
import ApprovalTable from '../../components/ApprovalTable'
import FilterPane from '../../components/FilterPane'

function Officer(props) {
  const classes = props.classes
  const endpoint_url = `${ENDPOINT}/api/notApproved`

  return (
    <div className={classes.root}>
      <NavBar enableDrawer={true} classes={classes} />
      <FilterPane classes={classes} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1 style={{ textAlign: 'center' }}>Members</h1>
        <ApprovalTable url={endpoint_url} classes={classes} data={[]} />
      </main>
    </div>
  )
}

Officer.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.any.isRequired,
}

export default Officer
