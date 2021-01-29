import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import saveAs from 'file-saver'

const downloadAllResumes = async (candidates) => {
  candidates.forEach((candidate) => startDownload(candidate))
}

const startDownload = (candidate) => {
  fetch(candidate.resume, {
    responseType: 'blob',
  })
    .then((response) => response.blob())
    .then((blob) => saveAs(blob, `${candidate.name} - Resume.pdf`))
}

function DownloadAll(props) {
  const candidates = useSelector((state) => state.cart.users)
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        style={props.style}
        onClick={() => downloadAllResumes(candidates)}
      >
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
