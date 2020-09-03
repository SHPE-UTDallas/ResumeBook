import React from 'react'
import PropTypes from 'prop-types'
import Collapse from '@material-ui/core/Collapse'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import CartButton from '../components/CartButton'
import { PDFObject } from 'react-pdfobject'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './Row.css'

const greenTheme = createMuiTheme({
  palette: { primary: { 500: '#28a745' } },
})

class Row extends React.Component {
  // ...
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }
  render() {
    const details = this.state.expanded ? (
      <TableRow>
        <TableCell colSpan={4} id={`u${this.props.data._id}`}>
          <Collapse in={this.state.expanded} unmountOnExit={true}>
            <PDFObject
              url={this.props.data.resume}
              height="500px"
              containerId={`u${this.props.data._id}`}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    ) : null

    return (
      <React.Fragment>
        <TableRow>
          <TableCell component="th" scope="row">
            {this.props.data.linkedin ? (
              <a
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'inline',
                }}
                target="_blank"
                rel="noopener noreferrer"
                href={this.props.data.linkedin}
              >
                <i
                  className="fa fa-linkedin-square mr-1"
                  aria-hidden="true"
                  style={{
                    fontSize: '20px',
                    color: '#0077B5',
                  }}
                ></i>{' '}
                <p>{this.props.data.name}</p>
              </a>
            ) : (
              <p>{this.props.data.name}</p>
            )}
          </TableCell>
          <TableCell align="left">
            <p>{this.props.data.major}</p>
          </TableCell>
          <TableCell align="left">
            <p>{this.props.data.standing}</p>
          </TableCell>
          <TableCell align="left">
            <Button
              variant="outlined"
              size="medium"
              style={{ marginRight: '8px' }}
              onClick={() =>
                this.setState(({ expanded }) => ({
                  expanded: !expanded,
                }))
              }
              color="primary"
            >
              View
            </Button>
            <MuiThemeProvider theme={greenTheme}>
              <CartButton userId={`${this.props.data._id}`} />
            </MuiThemeProvider>
          </TableCell>
        </TableRow>
        {details}
      </React.Fragment>
    )
  }
}

Row.propTypes = {
  data: PropTypes.object.isRequired,
}
export default Row
