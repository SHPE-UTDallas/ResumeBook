import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'
import { LinkedInLoginButton } from 'react-social-login-buttons'
import { ENDPOINT } from '../../utils/config'
import Footer from '../../components/Footer'

function App(props) {
  const classes = props.classes
  const endpoint_url = `${ENDPOINT}/auth/linkedin`
  return (
    <div className={classes.root}>
      <NavBar enableDrawer={false} classes={classes} />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <a href={endpoint_url}>
          <LinkedInLoginButton />
        </a>
      </div>
      <Footer />
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default App
