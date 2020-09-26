import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

function Remove(props) {

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="secondary"
      >
        Remove
      </Button>
    </React.Fragment>
  )
}

Remove.propTypes = {
  documentId: PropTypes.string.isRequired,
}
export default Remove
