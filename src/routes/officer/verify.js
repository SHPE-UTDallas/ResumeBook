import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'
import { Grid, FormControlLabel, Input, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { connect } from 'react-redux'
import { loginSuccess } from '../../redux/actions'
import { withRouter } from 'react-router-dom'
import { ENDPOINT } from '../../utils/config'
import Alert from '@material-ui/lab/Alert'

class OfficerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '', errorMessage: '', disabled: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  async handleSubmit(event) {
    this.setState({
      disabled: true,
    })

    event.preventDefault()
    const endpoint_url = `${ENDPOINT}/auth/officer`
    const response = await fetch(`${endpoint_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: this.state.value }),
    }).then((response) => response.json())
    if (response.message === 'Successfully Verified as an Officer') {
      localStorage.setItem('verified', true)
      localStorage.setItem('officer', true)
      this.props.loginSuccess(true, true)
      this.props.history.push('/officer')

      this.setState({
        errorMessage: '',
      })
    } else {
      this.setState({
        errorMessage: response.error,
      })
    }

    this.setState({
      disabled: false,
    })
  }

  render() {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <NavBar enableDrawer={false} classes={classes} />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container alignItems="center" direction="column" justify="center">
            <h3>Please verify your account by inputting the code provided to you</h3>
            {this.state.errorMessage === '' ? (
              <React.Fragment />
            ) : (
              <Alert severity="error">{this.state.errorMessage}</Alert>
            )}
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
                disabled={this.state.disabled}
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

OfficerForm.propTypes = {
  classes: PropTypes.object.isRequired,
  loginSuccess: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
}

export default connect(null, { loginSuccess })(withRouter(OfficerForm))
