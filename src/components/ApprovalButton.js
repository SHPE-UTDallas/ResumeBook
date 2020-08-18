import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { ENDPOINT } from '../utils/config'

function ApprovalButton(props) {
  const [approved, setApproved] = useState(false)
  const { documentId } = props

  const approveResume = () => {
    fetch(`${ENDPOINT}/api/resumes/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId: documentId }),
    }).then((res) => {
      if (res.status === 200) {
        setApproved(!approved)
      } else {
        //TODO: ERROR HANDLING
      }
    })
  }

  const unapproveResume = () => {
    fetch(`${ENDPOINT}/api/resumes/unapprove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId: documentId }),
    }).then((res) => {
      if (res.status === 200) {
        setApproved(!approved)
      } else {
        //TODO: ERROR HANDLING
      }
    })
  }

  const button = approved ? (
    <Button variant="outlined" color="secondary" onClick={() => unapproveResume()}>
      Unapprove
    </Button>
  ) : (
    <Button variant="outlined" color="primary" onClick={() => approveResume()}>
      Approve
    </Button>
  )
  return <React.Fragment>{button}</React.Fragment>
}

ApprovalButton.propTypes = {
  documentId: PropTypes.string.isRequired,
}
export default ApprovalButton
