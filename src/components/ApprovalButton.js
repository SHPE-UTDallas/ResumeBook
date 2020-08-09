import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { ENDPOINT } from '../utils/config'

function ApprovalButton(props) {
  const [approved, setApproved] = useState(false)

  const approveResume = () => {
    fetch(`${ENDPOINT}/api/resumes/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId: props.documentId }),
    }).then((res) => {
      if (res.status === 200) setApproved(!approved)
      console.log(res)
      console.log({ res })
    })
  }

  const unapproveResume = () => {}

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
