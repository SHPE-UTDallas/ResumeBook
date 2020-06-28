import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'
import { Grid, FormControlLabel, Input, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { connect } from 'react-redux'
import { loginSuccess } from '../../redux/actions'
import { withRouter } from 'react-router-dom'
import { ENDPOINT } from '../../utils/config'

class VerifyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const endpoint_url = `${ENDPOINT}/auth/verify`
    const response = await fetch(`${endpoint_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: this.state.value }),
    }).then((response) => response.text())
    if (response === 'Successfully Verified') {
      this.props.loginSuccess(true)
      this.props.history.push('/resumes')
    } else {
      //TODO: Add error messages
    }
  }

  render() {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <NavBar enableDrawer={false} classes={classes} />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container alignItems="center" direction="column" justify="center">
            <h3>Please verify you account by inputting the code provided to you</h3>
            <form onSubmit={this.handleSubmit}>
              <FormControlLabel
                className={classes.formEntry}
                control={<Input value={this.state.value} onChange={this.handleChange} />}
                label="Code:"
                labelPlacement="top"
              />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<SendIcon />}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Grid>
        </div>
      </div>
    )
  }
}

VerifyForm.propTypes = {
  classes: PropTypes.object.isRequired,
  loginSuccess: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
}

export default connect(null, { loginSuccess })(withRouter(VerifyForm))
