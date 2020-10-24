import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

function DownloadAll(props) {
  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" style={props.style}>
        Download All
      </Button>
    </React.Fragment>
  )
}

DownloadAll.propTypes = {
  documentId: PropTypes.string.isRequired,
  style: PropTypes.object,
}
export default DownloadAll
