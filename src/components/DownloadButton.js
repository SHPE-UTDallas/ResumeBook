import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import saveAs from 'file-saver'

const startDownload = (candidate) => {
  fetch(candidate.resume, {
    responseType: 'blob',
  })
    .then((response) => response.blob())
    .then((blob) => saveAs(blob, `${candidate.name} - Resume.pdf`))
}

function Download(props) {
  return (
    <React.Fragment>
      <Button
        onClick={() => startDownload(props.candidate)}
        variant="outlined"
        color="primary"
        style={{ marginRight: '8px' }}
      >
        Download
      </Button>
    </React.Fragment>
  )
}

Download.propTypes = {
  candidate: PropTypes.object.isRequired,
}
export default Download
