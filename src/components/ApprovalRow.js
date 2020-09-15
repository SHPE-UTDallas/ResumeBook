import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Collapse from '@material-ui/core/Collapse'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import ApprovalButton from '../components/ApprovalButton'
import { PDFObject } from 'react-pdfobject'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './Row.css'

const greenTheme = createMuiTheme({
  palette: { primary: { 500: '#28a745' } },
})

function ApprovalRow(props) {
  const [expanded, setExpanded] = useState(false)

  const details = expanded ? (
    <TableRow>
      <TableCell colSpan={4} id={`u${props.data._id}`}>
        <Collapse in={expanded} unmountOnExit={true}>
          <PDFObject
            url={props.data.resume}
            height="500px"
            containerId={`u${props.data._id}`}
          />
        </Collapse>
      </TableCell>
    </TableRow>
  ) : (
    <React.Fragment />
  )

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          {props.data.linkedin ? (
            <a
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'inline',
              }}
              target="_blank"
              rel="noopener noreferrer"
              href={props.data.linkedin}
            >
              <i
                className="fa fa-linkedin-square mr-1"
                aria-hidden="true"
                style={{
                  fontSize: '20px',
                  color: '#0077B5',
                }}
              ></i>{' '}
              <p>{props.data.name}</p>
            </a>
          ) : (
            <p>{props.data.name}</p>
          )}
        </TableCell>
        <TableCell align="left">
          <p>{props.data.major}</p>
        </TableCell>
        <TableCell align="left">
          <p>{props.data.standing}</p>
        </TableCell>
        <TableCell align="left">
          <Button
            variant="outlined"
            size="medium"
            style={{ marginRight: '8px' }}
            onClick={() => setExpanded(!expanded)}
            color="primary"
          >
            View
          </Button>
          <MuiThemeProvider theme={greenTheme}>
            <ApprovalButton
              documentId={`${props.data._id}`}
              approved={props.data.approved}
            />
          </MuiThemeProvider>
        </TableCell>
      </TableRow>
      {details}
    </React.Fragment>
  )
}

ApprovalRow.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ApprovalRow
