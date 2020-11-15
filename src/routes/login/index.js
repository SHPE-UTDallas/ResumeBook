import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'
import { LinkedInLoginButton } from 'react-social-login-buttons'
import { ENDPOINT } from '../../utils/config'
import { Grid } from '@material-ui/core'

function App(props) {
  const classes = props.classes
  const endpoint_url = `${ENDPOINT}/auth/linkedin`

  const mystyle = {
    border: 0,
    marginTop: 20,
    textAlign: 'center',
    padding: '10px',
  }
  return (
    <div className={classes.root}>
      <NavBar enableDrawer={false} classes={classes} />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <h1 style={mystyle}> Welcome Back. Please sign in with LinkedIn below </h1>
        <Grid item md={3} sm={6} xs={10} style={{ margin: '0 auto' }}>
          <a href={endpoint_url} style={{ textDecoration: 'none' }}>
            <LinkedInLoginButton />
          </a>
        </Grid>
      </div>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default App
