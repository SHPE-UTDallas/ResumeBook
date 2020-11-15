import { Fragment, useState } from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { ENDPOINT } from '../utils/config'

function ApprovalButton(props) {
  const [approved, setApproved] = useState(props.approved)
  const [disabled, setDisabled] = useState(false)
  const { documentId } = props

  const approveResume = () => {
    setDisabled(true)
    fetch(`${ENDPOINT}/api/resumes/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId: documentId }),
    }).then((res) => {
      if (res.status === 200) {
        setApproved(!approved)
        setDisabled(false)
      } else {
        //TODO: ERROR HANDLING
      }
    })
  }

  const unapproveResume = () => {
    setDisabled(true)
    fetch(`${ENDPOINT}/api/resumes/unapprove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId: documentId }),
    }).then((res) => {
      if (res.status === 200) {
        setApproved(!approved)
        setDisabled(false)
      } else {
        //TODO: ERROR HANDLING
      }
    })
  }

  const button = approved ? (
    <Button
      variant="outlined"
      disabled={disabled}
      color="secondary"
      onClick={() => unapproveResume()}
    >
      Unapprove
    </Button>
  ) : (
    <Button
      variant="outlined"
      disabled={disabled}
      color="primary"
      onClick={() => approveResume()}
    >
      Approve
    </Button>
  )
  return <Fragment>{button}</Fragment>
}

ApprovalButton.propTypes = {
  documentId: PropTypes.string.isRequired,
  approved: PropTypes.bool.isRequired,
}
export default ApprovalButton
