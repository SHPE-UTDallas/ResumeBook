import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

function Download() {
  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" style={{ marginRight: '8px' }}>
        Download
      </Button>
    </React.Fragment>
  )
}

Download.propTypes = {
  documentId: PropTypes.string.isRequired,
}
export default Download
