import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import saveAs from 'file-saver'

const downloadAllResumes = async (candidates, setErrorMessage) => {
  setErrorMessage('')
  candidates.forEach((candidate) => startDownload(candidate, setErrorMessage))
}

const startDownload = (candidate, setErrorMessage) => {
  fetch(candidate.resume, {
    responseType: 'blob',
  })
    .then((response) => response.blob())
    .then((blob) => saveAs(blob, `${candidate.name} - Resume.pdf`))
    .catch((err) => {
      setErrorMessage(err.message)
    })
}

function DownloadAll(props) {
  const candidates = useSelector((state) => state.cart.users)
  const { setErrorMessage } = props

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        style={props.style}
        onClick={() => downloadAllResumes(candidates, setErrorMessage)}
      >
        Download All
      </Button>
    </React.Fragment>
  )
}

DownloadAll.propTypes = {
  documentId: PropTypes.string.isRequired,
  style: PropTypes.object,
  setErrorMessage: PropTypes.func.isRequired,
}
export default DownloadAll
